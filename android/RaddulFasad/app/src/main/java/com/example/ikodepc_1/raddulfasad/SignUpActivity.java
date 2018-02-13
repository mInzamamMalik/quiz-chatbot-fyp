package com.example.ikodepc_1.raddulfasad;

import android.app.ProgressDialog;
import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.example.ikodepc_1.raddulfasad.interfaces.CommonMethods;
import com.example.ikodepc_1.raddulfasad.utils.CustomToast;
import com.example.ikodepc_1.raddulfasad.utils.Util;
import com.valdesekamdem.library.mdtoast.MDToast;

import org.json.JSONObject;

import javax.net.ssl.SSLContext;

import cz.msebera.android.httpclient.client.methods.HttpPost;
import cz.msebera.android.httpclient.conn.scheme.Scheme;
import cz.msebera.android.httpclient.conn.ssl.SSLSocketFactory;
import cz.msebera.android.httpclient.entity.StringEntity;
import cz.msebera.android.httpclient.impl.client.BasicResponseHandler;
import cz.msebera.android.httpclient.impl.client.DefaultHttpClient;

public class SignUpActivity extends AppCompatActivity implements CommonMethods,View.OnClickListener {

    EditText edt_fname, edt_lname, edt_email, edt_pswrd;

    Button signup_button;

    private static final String URL = "https://us-central1-rad-ul-fasaad.cloudfunctions.net/signup";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_up);
        initialize();
        setUpListners();
    }

    @Override
    public void initialize() {
        edt_fname = (EditText)findViewById(R.id.f_name);
        edt_lname = (EditText)findViewById(R.id.l_name);
        edt_email = (EditText)findViewById(R.id.email);
        edt_pswrd = (EditText)findViewById(R.id.pswd);
        signup_button = (Button)findViewById(R.id.signup);
    }

    @Override
    public void setUpListners() {
        signup_button.setOnClickListener(SignUpActivity.this);
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.signup:
                if(Util.etValidate(edt_fname) && Util.etValidate(edt_lname) &&Util.etValidate(edt_email) && Util.etValidate(edt_pswrd)){
                    new Signup().execute(edt_fname.getText().toString().trim(),
                            edt_lname.getText().toString().trim(),
                            edt_email.getText().toString().trim(),
                            edt_pswrd.getText().toString().trim());
                }
                break;
        }
    }

    private class Signup extends AsyncTask<String, Void, String>{
        ProgressDialog progressDialog;

        public Signup() {
            this.progressDialog = new ProgressDialog(SignUpActivity.this);
            this.progressDialog.setCancelable(false);
            this.progressDialog.setMessage("Please Wait");
        }

        @Override
        protected void onPreExecute() {
            super.onPreExecute();
            this.progressDialog.show();
        }

        @Override
        protected String doInBackground(String... strings) {
            String response = null;
            try {
                SSLSocketFactory sf = new SSLSocketFactory(
                        SSLContext.getInstance("Default"),
                        SSLSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER);
                Scheme sch = new Scheme("https", 443, sf);
                String object = registration(strings[0],strings[1], strings[2], strings[3]);
                HttpPost httpPost = new HttpPost(URL);
                StringEntity stringEntity = new StringEntity(object);
                httpPost.setEntity(stringEntity);
                httpPost.setHeader("Content-type","application/json");
                DefaultHttpClient defaultHttpClient = new DefaultHttpClient();
                defaultHttpClient.getConnectionManager().getSchemeRegistry().register(sch);
                BasicResponseHandler basicResponseHandler = new BasicResponseHandler();
                response = defaultHttpClient.execute(httpPost,basicResponseHandler);
            } catch (Exception e) {
                Log.d("Exception", e.toString());
            }
            return response;
        }

        @Override
        protected void onPostExecute(String s) {
            super.onPostExecute(s);
            Log.d("POST", ""+s);
            if(s != null){
                try {
                    JSONObject jsonObject = new JSONObject(s);
                    if(jsonObject.getInt("status") == 200 && jsonObject.get("message").equals("signed up")){
                        CustomToast.showToast(SignUpActivity.this,"Created Successfully", MDToast.TYPE_SUCCESS);
                        finish();
                    }else {
                        CustomToast.showToast(SignUpActivity.this,"Account Has Already Exists",MDToast.TYPE_INFO);
                    }
                }catch (Exception e){
                    Log.d("Exception", "onPostExecute: "+e);
                }
            }else {
                CustomToast.showToast(SignUpActivity.this,"Server Not Responding",MDToast.TYPE_ERROR);
            }
            this.progressDialog.dismiss();
        }
    }

    private String registration(String fname, String lname, String email, String password) throws Exception{
        JSONObject object = new JSONObject();
        object.put("fName",fname);
        object.put("lName",lname);
        object.put("email",email);
        object.put("password",password);
        return object.toString(1);
    }
}
