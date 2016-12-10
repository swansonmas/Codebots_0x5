package com.webratio.units.store.datesfunctionunit;

import java.sql.Date;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Map;

import net.objectlab.kit.datecalc.common.DateCalculator;
import net.objectlab.kit.datecalc.common.HolidayHandlerType;
import net.objectlab.kit.datecalc.joda.LocalDateKitCalculatorsFactory;

import org.apache.commons.beanutils.ConvertUtils;
import org.apache.commons.lang.math.NumberUtils;
import org.dom4j.Element;
import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;
import org.joda.time.LocalDate;

import com.webratio.rtx.RTXConstants;
import com.webratio.rtx.RTXException;
import com.webratio.rtx.RTXManager;
import com.webratio.rtx.RTXOperationUnitService;
import com.webratio.rtx.beans.ExtendedOperationUnitBean;
import com.webratio.rtx.core.AbstractService;
import com.webratio.rtx.core.BeanHelper;
import com.webratio.rtx.core.DescriptorHelper;

/**
 * The runtime service for the dates function unit.
 */
@SuppressWarnings({"rawtypes", "unchecked"})
public class DatesFunctionUnitService extends AbstractService implements RTXOperationUnitService {

    private static final String MODE_ADD_DAYS_TO_DATE = "addDaysToDate(s)";
    private static final String MODE_REMOVE_DAYS_FROM_DATE = "removeDaysFromDate(s)";
    private static final String MODE_FIRST_DAY_OF_MONTH = "firstDayOfMonth(s)";
    private static final String MODE_LAST_DAY_OF_MONTH = "lastDayOfMonth(s)";
    private static final String MODE_FIRST_DAY_OF_YEAR = "firstDayOfYear(s)";
    private static final String MODE_LAST_DAY_OF_YEAR = "lastDayOfYear(s)";
    private static final String MODE_START_DAY_TIMESTAMP = "startDayTimestamp(s)";
    private static final String MODE_END_DAY_TIMESTAMP = "endDayTimestamp(s)";
    private static final String MODE_ADD_WORKING_DAYS_TO_DATE = "addWorkingDaysToDate(s)";
    private static final String MODE_REMOVE_WORKING_DAYS_FROM_DATE = "removeWorkingDaysFromDate(s)";
    private static final String MODE_FROM_STRING_TO_DATE = "fromString(s)ToDate(s)";
    private static final String MODE_FROM_DATE_TO_STRING = "fromDate(s)ToString(s)";
    
    /** The unit mode, indicating the performed operation */
    private final String mode;
    
    /** The default number of days to add */
    private final int defaultNumberOfDays;
    
    /** The default pattern, used for formatting dates */
    private final String defaultPattern;
    
    /**
     * Constructs a new Dates Function Unit service
     * 
     * @param id
     *            the id of the unit.
     * @param mgr
     *            the shared runtime manager.
     * @param descr
     *            the unit descriptor element.
     * @throws RTXException
     *             in case an error occurs initializing the service.
     */
    public DatesFunctionUnitService(String id, RTXManager mgr, Element descr) throws RTXException {
        super(id, mgr, descr);
        this.mode = DescriptorHelper.getChildValue(descr, "Mode", true, this);
        this.defaultNumberOfDays = NumberUtils.toInt(DescriptorHelper.getChildValue(descr, "NumberOfDays", false, this), 0);
        this.defaultPattern = DescriptorHelper.getChildValue(descr, "Pattern", false, this);
    }    

	/*
     * (non-Javadoc)
     * 
     * @see com.webratio.rtx.RTXContentUnitService#execute(java.util.Map, java.util.Map)
     */
	public Object execute(Map operationContext, Map sessionContext) throws RTXException {
		ExtendedOperationUnitBean bean = new ExtendedOperationUnitBean();
		try {
			if (MODE_ADD_DAYS_TO_DATE.equals(mode)) {
				doAddOrRemoveDays(bean, operationContext, sessionContext, "add");
			} else if (MODE_REMOVE_DAYS_FROM_DATE.equals(mode)) {
				doAddOrRemoveDays(bean, operationContext, sessionContext, "remove");
			} else if (MODE_ADD_WORKING_DAYS_TO_DATE.equals(mode)) {
				doAddOrRemoveWorkingDays(bean, operationContext, sessionContext, "add");
			} else if (MODE_REMOVE_WORKING_DAYS_FROM_DATE.equals(mode)) {
				doAddOrRemoveWorkingDays(bean, operationContext, sessionContext, "remove");
			} else if (MODE_FIRST_DAY_OF_MONTH.equals(mode)) {
				doGetFirstOrLastDay(bean, operationContext, sessionContext, "month", "first");
			} else if (MODE_LAST_DAY_OF_MONTH.equals(mode)) {
				doGetFirstOrLastDay(bean, operationContext, sessionContext, "month", "last");
			} else if (MODE_FIRST_DAY_OF_YEAR.equals(mode)) {
				doGetFirstOrLastDay(bean, operationContext, sessionContext, "year", "first");
			} else if (MODE_LAST_DAY_OF_YEAR.equals(mode)) {
				doGetFirstOrLastDay(bean, operationContext, sessionContext, "year", "last");
			} else if (MODE_START_DAY_TIMESTAMP.equals(mode)) {
				doGetTimestamp(bean, operationContext, sessionContext, "start");
			} else if (MODE_END_DAY_TIMESTAMP.equals(mode)) {
				doGetTimestamp(bean, operationContext, sessionContext, "end");			
			} else if (MODE_FROM_STRING_TO_DATE.equals(mode)) {
				doFromStringToDate(bean, operationContext, sessionContext);
			} else if (MODE_FROM_DATE_TO_STRING.equals(mode)) {
				doFromDateToString(bean, operationContext, sessionContext);
			}
		} catch (Exception e) {
            logError("Unable to execute the dates function unit service", e);
            bean.setResultCode(RTXConstants.ERROR_CODE);
            bean.put("errorMessage", e.getMessage());
            bean.put("exception", e);   
            throw new RTXException(e);
        }
        return bean;
	}

	/**
	 * Adds/removes the specified number of days to the date.
     * 
     * @param bean
     *            the result unit bean.
     * @param operationContext
     *            a set of name-to-object bindings, preloaded with values of parameters (having scope = request).
     * @param sessionContext
     *            a set of name-to-object bindings, preloaded with values of parameters (having scope = session).
	 * @param operationType
     * 			  the operation to perform.            
     * @throws Exception
     */
	private void doAddOrRemoveDays(ExtendedOperationUnitBean bean, Map operationContext, Map sessionContext, String operationType) throws Exception {
		String[] inputDatesArray = BeanHelper.asStringArray(operationContext.get(getId() + ".dateArray"));
		String[] inputNumberDaysArray = BeanHelper.asStringArray(operationContext.get(getId() + ".numberOfDaysArray"));
		Date[] resultDates = new Date[inputDatesArray.length];

		if (BeanHelper.isNullOrEmptyArray(inputDatesArray) || BeanHelper.isNullOrEmptyArray(inputNumberDaysArray)){
			return;
		}
		if ((inputDatesArray.length==1 && BeanHelper.isNullOrEmptyString(inputDatesArray[0])) ||
				inputNumberDaysArray.length==1 && BeanHelper.isNullOrEmptyString(inputNumberDaysArray[0])) {			
			return;
		}
		
		for (int i=0; i<inputDatesArray.length; i++) {
			int numberDays = 0;
			LocalDate inputDate = new LocalDate(inputDatesArray[i]);
			if (inputNumberDaysArray.length == 1) {
				numberDays = Integer.valueOf(inputNumberDaysArray[0]).intValue();
			} else if (inputNumberDaysArray.length > 1) {
				numberDays = Integer.valueOf(inputNumberDaysArray[i]).intValue();
			} else {	
				numberDays = defaultNumberOfDays;
			}
			LocalDate endDate = inputDate;
			if (operationType.equals("add")) {
				endDate = inputDate.plusDays(numberDays);
			} else if (operationType.equals("remove")) {
				endDate = inputDate.minusDays(numberDays);
			}			
			Date resultDate = new Date(endDate.toDate().getTime());
			resultDates[i] = resultDate;
		}
		bean.put("resultDates", resultDates);
	}
	
	/**
	 * Adds/removes the specified number of working days to the date.
     * 
     * @param bean
     *            the result unit bean.
     * @param operationContext
     *            a set of name-to-object bindings, preloaded with values of parameters (having scope = request).
     * @param sessionContext
     *            a set of name-to-object bindings, preloaded with values of parameters (having scope = session).
	 * @param operationType
     * 			  the operation to perform.            
     * @throws Exception
     */
	private void doAddOrRemoveWorkingDays(ExtendedOperationUnitBean bean, Map operationContext, Map sessionContext, String operationType) throws Exception {
		String[] inputDatesArray = BeanHelper.asStringArray(operationContext.get(getId() + ".dateArray"));
		String[] inputNumberDaysArray = BeanHelper.asStringArray(operationContext.get(getId() + ".numberOfDaysArray"));
		Date[] resultDates = new Date[inputDatesArray.length];
		
		if (BeanHelper.isNullOrEmptyArray(inputDatesArray) || BeanHelper.isNullOrEmptyArray(inputNumberDaysArray)){
			return;
		}
		if ((inputDatesArray.length==1 && BeanHelper.isNullOrEmptyString(inputDatesArray[0])) ||
				inputNumberDaysArray.length==1 && BeanHelper.isNullOrEmptyString(inputNumberDaysArray[0])) {			
			return;
		}
		
		String holidayHandlerType = operationType.equals("add")? HolidayHandlerType.FORWARD : HolidayHandlerType.BACKWARD;
		for (int i=0; i<inputDatesArray.length; i++) {
			int numberDays = 0;
			LocalDate inputDate = new LocalDate(inputDatesArray[i]);
			if (inputNumberDaysArray.length == 1) {
				numberDays = Integer.valueOf(inputNumberDaysArray[0]).intValue();
			} else if (inputNumberDaysArray.length > 1) {
				numberDays = Integer.valueOf(inputNumberDaysArray[i]).intValue();
			} else {	
				numberDays = defaultNumberOfDays;
			}
			numberDays = operationType.equals("add")? numberDays : -numberDays;
			
			LocalDate endDate = inputDate;
			DateCalculator dateCalculator = LocalDateKitCalculatorsFactory.getDefaultInstance().getDateCalculator("UK", holidayHandlerType);
			dateCalculator.setStartDate(new LocalDate(inputDatesArray[i]));				
			endDate = (LocalDate) dateCalculator.moveByBusinessDays(numberDays).getCurrentBusinessDate();			
			Date resultDate = new Date(endDate.toDate().getTime());
			resultDates[i] = resultDate;
		}
		bean.put("resultDates", resultDates);
	}
	
	/**
	 * Gets the first/last day of the month/year.
     * 
     * @param bean
     *            the result unit bean.
     * @param operationContext
     *            a set of name-to-object bindings, preloaded with values of parameters (having scope = request).
     * @param sessionContext
     *            a set of name-to-object bindings, preloaded with values of parameters (having scope = session). 
     * @param datePart
     * 			  the part of the date to consider (month or year).
     * @param operationType
     * 			  the operation to perform. 
     * @throws Exception
     */
	private void doGetFirstOrLastDay(ExtendedOperationUnitBean bean, Map operationContext, Map sessionContext, String datePart, String operationType) throws Exception {
		String[] inputDatesArray = BeanHelper.asStringArray(operationContext.get(getId() + ".dateArray"));				
		Date[] resultDates = new Date[inputDatesArray.length];		
		
		if (BeanHelper.isNullOrEmptyArray(inputDatesArray)){
			return;
		}
		if (inputDatesArray.length==1 && BeanHelper.isNullOrEmptyString(inputDatesArray[0])) {			
			return;
		}
		
		for (int i=0; i<inputDatesArray.length; i++) {			
			LocalDate inputDate = new LocalDate(inputDatesArray[i]);
			LocalDate endDate = inputDate;
			if (datePart.equals("month") && operationType.equals("first")) {
				endDate = inputDate.dayOfMonth().withMinimumValue();				
			} else if (datePart.equals("month") && operationType.equals("last")) {
				endDate = inputDate.dayOfMonth().withMaximumValue();
			} else if (datePart.equals("year") && operationType.equals("first")) {
				endDate = inputDate.dayOfYear().withMinimumValue();
			} else if (datePart.equals("year") && operationType.equals("last")) {
				endDate = inputDate.dayOfYear().withMaximumValue();
			}
			Date resultDate = new Date(endDate.toDate().getTime());
			resultDates[i] = resultDate;
		}
		bean.put("resultDates", resultDates);
	}
	
	/**
	 * Gets the start/end timestamp of the day.
     * 
     * @param bean
     *            the result unit bean.
     * @param operationContext
     *            a set of name-to-object bindings, preloaded with values of parameters (having scope = request).
     * @param sessionContext
     *            a set of name-to-object bindings, preloaded with values of parameters (having scope = session). 
     * @param operationType
     * 			  the operation to perform. 
     * @throws Exception
     */	
	private void doGetTimestamp(ExtendedOperationUnitBean bean, Map operationContext, Map sessionContext, String operationType) throws Exception {
		String[] inputDatesArray = BeanHelper.asStringArray(operationContext.get(getId() + ".timestampArray"));				
		Timestamp[] resultTimestamps = new Timestamp[inputDatesArray.length];
		
		if (BeanHelper.isNullOrEmptyArray(inputDatesArray)){
			return;
		}
		if (inputDatesArray.length==1 && BeanHelper.isNullOrEmptyString(inputDatesArray[0])) {			
			return;
		}
		
		for (int i=0; i<inputDatesArray.length; i++) {
			DateTimeFormatter formatter = DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss.m");
            DateTime inputDate = formatter.parseDateTime(inputDatesArray[i]);
            DateTime resultDate = inputDate;
            if (operationType.equals("start")) {
            	resultDate = inputDate.millisOfDay().withMinimumValue();
            } else if (operationType.equals("end")){
            	resultDate = inputDate.millisOfDay().withMaximumValue();
            }
            Timestamp resultTimestamp = new Timestamp(resultDate.getMillis());
            resultTimestamps[i] = resultTimestamp;
		}
		bean.put("resultTimestamps", resultTimestamps);
	}

	/**
	 * Converts a string representing a date to a SQL date.
     * 
     * @param bean
     *            the result unit bean.
     * @param operationContext
     *            a set of name-to-object bindings, preloaded with values of parameters (having scope = request).
     * @param sessionContext
     *            a set of name-to-object bindings, preloaded with values of parameters (having scope = session). 
     * @throws Exception
     */
	private void doFromStringToDate(ExtendedOperationUnitBean bean, Map operationContext, Map sessionContext) throws Exception {
		String[] inputStringsArray = BeanHelper.asStringArray(operationContext.get(getId() + ".stringArray"));
		String[] patternsArray = BeanHelper.asStringArray(operationContext.get(getId() + ".patternArray"));
		Date[] resultDates = new Date[inputStringsArray.length];
		
		if (BeanHelper.isNullOrEmptyArray(inputStringsArray) || BeanHelper.isNullOrEmptyArray(patternsArray)){
			return;
		}
		if ((inputStringsArray.length==1 && BeanHelper.isNullOrEmptyString(inputStringsArray[0])) ||
				patternsArray.length==1 && BeanHelper.isNullOrEmptyString(patternsArray[0])) {			
			return;
		}
		
		for (int i=0; i<inputStringsArray.length; i++) {
			String pattern = defaultPattern;
			if (patternsArray.length == 1) {
				pattern = patternsArray[0];
			} else if (patternsArray.length > 1) {
				pattern = patternsArray[i];
			}
			SimpleDateFormat formatter = new SimpleDateFormat(pattern);			
			java.util.Date formattedDate = formatter.parse(inputStringsArray[i]);
			Date resultDate = new Date(formattedDate.getTime());
			resultDates[i] = resultDate;
		}
		bean.put("resultDates", resultDates);		
	}
	
	/**
	 * Converts a SQL date to a string, formatting it according to the specified pattern.
     * 
     * @param bean
     *            the result unit bean.
     * @param operationContext
     *            a set of name-to-object bindings, preloaded with values of parameters (having scope = request).
     * @param sessionContext
     *            a set of name-to-object bindings, preloaded with values of parameters (having scope = session). 
     * @throws Exception
     */
	private void doFromDateToString(ExtendedOperationUnitBean bean, Map operationContext, Map sessionContext) throws Exception {
		String[] inputDatesArray = BeanHelper.asStringArray(operationContext.get(getId() + ".dateArray"));
		Date[] datesArray = (Date[]) ConvertUtils.convert(inputDatesArray, java.sql.Date.class);
		String[] patternsArray = BeanHelper.asStringArray(operationContext.get(getId() + ".patternArray"));
		String[] resultStrings = new String[inputDatesArray.length];
		
		if (BeanHelper.isNullOrEmptyArray(inputDatesArray) || BeanHelper.isNullOrEmptyArray(patternsArray)){
			return;
		}
		if ((inputDatesArray.length==1 && BeanHelper.isNullOrEmptyString(inputDatesArray[0])) ||
				patternsArray.length==1 && BeanHelper.isNullOrEmptyString(patternsArray[0])) {			
			return;
		}
		
		for (int i=0; i<datesArray.length; i++) {
			String pattern = defaultPattern;
			if (patternsArray.length == 1) {
				pattern = patternsArray[0];
			} else if (patternsArray.length > 1) {
				pattern = patternsArray[i];
			}
			SimpleDateFormat formatter = new SimpleDateFormat(pattern);					
			String resultString = formatter.format(datesArray[i]);			
			resultStrings[i] = resultString;
		}
		bean.put("resultStrings", resultStrings);
	}
	
	/*
     * (non-Javadoc)
     * 
     * @see com.webratio.rtx.RTXService#dispose()
     */
	public void dispose() {
	}
}
