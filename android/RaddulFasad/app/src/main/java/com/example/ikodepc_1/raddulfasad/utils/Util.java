package com.example.ikodepc_1.raddulfasad.utils;

import android.graphics.Bitmap;
import android.os.Environment;
import android.util.Log;
import android.widget.EditText;
import android.widget.TextView;

import java.io.File;
import java.io.FileOutputStream;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by TEN on 3/15/2017.
 */

public class Util {

    public static final int REQUEST_CODE_CAPTURE_IMAGE = 124;

    public static boolean etValidate(EditText edittext){
        String validate = edittext.getText().toString();
        validate = validate.replaceAll("\\s+", " ").trim();
        if(validate.isEmpty())
        {
            edittext.setError("Required");
            return false;
        }
        return true;
    }

    public static boolean tvValidate(TextView textView){

        textView.setError(null);
        String validate = textView.getText().toString();
        validate = validate.replaceAll("\\s+", " ").trim();
        if(validate.isEmpty())
        {
            textView.setError("Required");
            return false;
        }
        return true;
    }

    public static void tvInvalidate(TextView tv){

        tv.setError(null);

    }

    public static boolean isValidEmail(EditText edittext) {
        String email = edittext.getText().toString();
        String EMAIL_PATTERN = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
                + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";

        Pattern pattern = Pattern.compile(EMAIL_PATTERN);
        Matcher matcher = pattern.matcher(email);
        if(matcher.matches())
            return matcher.matches();
        else{
            edittext.setError("Invalid Email");
            return matcher.matches();
        }
    }

    public static boolean matchPassword(EditText password, EditText confirm_password){
        if(password.getText().toString().equals(confirm_password.getText().toString())){
            return true;
        }else{
            confirm_password.setError("Password did not match");
            return false;
        }
    }

    public static boolean isValidPassword(EditText edittext) {

        String password = edittext.getText().toString();
//        final String PASSWORD_PATTERN = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{4,}$";
        String PASSWORD_PATTERN = "((?!\\s)\\A)(\\s|(?<!\\s)\\S){6,20}\\Z";

        Pattern pattern = Pattern.compile(PASSWORD_PATTERN);
        Matcher matcher = pattern.matcher(password);
        if(matcher.matches())
            return matcher.matches();
        else{
            edittext.setError("At least 6 characters");
            return matcher.matches();
        }
    }

    public static boolean passwordLength(EditText password, int length){

        if(password.getText().length() >= length){
            return true;
        }else{
            password.setError("At least 6 characters");
            return false;
        }
    }

    public static boolean showTitleValidation(EditText editText){

        String title = editText.getText().toString();
        String PATTERN = "^[a-zA-Z ]+$";

        Pattern pattern = Pattern.compile(PATTERN);
        Matcher matcher = pattern.matcher(title);
        if(matcher.matches())
            return matcher.matches();
        else{
            editText.setError("Only charachers allow");
            return matcher.matches();
        }
    }

    public static String getDateFullSpell(String dateTime){

        // 2017-03-20 13:45:00

        String[] data = dateTime.split(" ");
        String date = data[0];

//        String input_date="24-03-2017";
        SimpleDateFormat format1=new SimpleDateFormat("yyyy-MM-dd");
        Date dt1= null;
        try {
            dt1 = format1.parse(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        DateFormat formatDate=new SimpleDateFormat("dd");
        DateFormat formatDay=new SimpleDateFormat("EEEE");
        DateFormat formatMonth=new SimpleDateFormat("MMMM");
        DateFormat formatYear=new SimpleDateFormat("yyyy");
        String finalDay = formatDay.format(dt1);
        String finalDate = formatDate.format(dt1);
        String finalMonth = formatMonth.format(dt1);
        String finalYear = formatYear.format(dt1);
//        switch (finalDate){
//            case "01":
//                finalDate = finalDate + "st";
//                break;
//            case "02":
//                finalDate = finalDate + "nd";
//                break;
//            case "03":
//                finalDate = finalDate + "rd";
//                break;
//            default:
//                finalDate = finalDate + "th";
//                break;
//        }
        return finalDay+" "+finalDate+" "+finalMonth+" "+finalYear;
    }

    public static String getDate(String dateTime){

        // 2017-03-20 13:45:00

        String[] data = dateTime.split(" ");
        String date = data[0];

//        String input_date="24-03-2017";
        SimpleDateFormat format1=new SimpleDateFormat("yyyy-MM-dd");
        Date dt1= null;
        try {
            dt1 = format1.parse(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        DateFormat formatDate=new SimpleDateFormat("dd");
        DateFormat formatDay=new SimpleDateFormat("EEE");
        DateFormat formatMonth=new SimpleDateFormat("MMM");
        DateFormat formatYear=new SimpleDateFormat("yyyy");
        String finalDay = formatDay.format(dt1);
        String finalDate = formatDate.format(dt1);
        String finalMonth = formatMonth.format(dt1);
        String finalYear = formatYear.format(dt1);

        return finalDay+" "+finalDate+" "+finalMonth+" "+finalYear;
    }

    public static String getTime(String dateTime) {

        // 2017-03-20 13:45:00

        String[] data = dateTime.split(" ");
        String time = data[1];

        String militeryTime = "";
        String[] date = time.split(":");
        for (int i = 0; i < 2; i++){
            militeryTime = militeryTime + date[i];
        }

        if (militeryTime == null)
            return time;

        // Convert time where time is like: 0100, 0200, 0300....2300...

        String hour = militeryTime.substring(0,2);
        String minutes = militeryTime.substring(2,4);
        String meridian = "AM";

        if (hour.substring(0,2).equals("00")) {
            hour = "12";
        } else if (Integer.valueOf(hour) > 11) {
            meridian = "PM";
            Integer militaryHour = Integer.parseInt(hour);
            Integer convertedHour = null;

            if (militaryHour > 12) {
                convertedHour = (militaryHour - 12);

                if (convertedHour < 10)
                    hour = "0" + String.valueOf(convertedHour);
                else
                    hour = String.valueOf(convertedHour);
            }
        }

//        if (hour.substring(0,2).equals("00")) {
//            hour = "12";
//        } else if (hour.substring(0,1).equals("1") || hour.substring(0,1).equals("2")) {
//            meridian = "PM";
//            Integer militaryHour = Integer.parseInt(hour);
//            Integer convertedHour = null;
//
//            if (militaryHour > 12) {
//                convertedHour = (militaryHour - 12);
//
//                if (convertedHour < 10)
//                    hour = "0" + String.valueOf(convertedHour);
//                else
//                    hour = String.valueOf(convertedHour);
//            }
//        }

        time = hour + ":" + minutes + " " + meridian;


        // TODO - Convert time where time is like 01:00...23:00...

        return time;
    }


    public static String timeConvert(int minutes) {
        if (minutes > 0){
            int days = minutes/60/24;
            if (days > 0){
                return days + " days remaining";
            }else{
                int hours = minutes/60;
                if (hours > 0){
                    return hours + " hours remaining";
                }else{
                    return minutes + " minutes remaining";
                }
            }
        } else {
            return  minutes/24/60 + " days past";
        }
    }

    public static List<String> createBirthYearList(){
        List<String> birthYear = new ArrayList<>();
        for (int i = 71; i > 0; i--){
            birthYear.add(String.valueOf(1939 + i));
        }
        return birthYear;
    }

    public static int getNumber(String s){
        // new_123

        Log.d("string", ""+s);
        String[] string = s.split("_");
        return Integer.parseInt(string[1]);
    }

    public String removeLastChar(String str) {
        return str.substring(0, str.length() - 1);
    }

}
