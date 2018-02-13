package com.example.ikodepc_1.raddulfasad;

import android.app.ProgressDialog;
import android.content.Intent;
import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.example.ikodepc_1.raddulfasad.interfaces.CommonMethods;
import com.example.ikodepc_1.raddulfasad.utils.Util;

import org.json.JSONObject;

import javax.net.ssl.SSLContext;

import cz.msebera.android.httpclient.client.methods.HttpPost;
import cz.msebera.android.httpclient.conn.scheme.Scheme;
import cz.msebera.android.httpclient.conn.ssl.SSLSocketFactory;
import cz.msebera.android.httpclient.entity.StringEntity;
import cz.msebera.android.httpclient.impl.client.BasicResponseHandler;
import cz.msebera.android.httpclient.impl.client.DefaultHttpClient;

public class LoginActivity extends AppCompatActivity implements CommonMethods,View.OnClickListener {

    private static final String URL_LOGIN = "https://us-central1-rad-ul-fasaad.cloudfunctions.net/login";
    EditText edt_email, edt_pswd;
    Button login_button;
    TextView signupLink;
    String email, password;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        initialize();
        setUpListners();
    }

    @Override
    public void initialize() {
        edt_email = (EditText) findViewById(R.id.edt_email);
        edt_pswd = (EditText) findViewById(R.id.edt_password);
        login_button = (Button) findViewById(R.id.login);
        signupLink = (TextView) findViewById(R.id.signup_link);
    }

    @Override
    public void setUpListners() {
        login_button.setOnClickListener(this);
        signupLink.setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.login:
                if(Util.etValidate(edt_email) && Util.isValidEmail(edt_email) && Util.etValidate(edt_pswd)){
                    new Login().execute(edt_email.getText().toString().trim(),edt_pswd.getText().toString().trim());
                }
                break;
            case R.id.signup_link:
                startActivity(new Intent(LoginActivity.this,SignUpActivity.class));
                break;
        }
    }

    private class Login extends AsyncTask<String,Void,String>{

        ProgressDialog progressDialog;

        public Login() {
            this.progressDialog = new ProgressDialog(LoginActivity.this);
            this.progressDialog.setMessage("Please Wait...");
            this.progressDialog.setCancelable(false);
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
                String object = registration(strings[0],strings[1]);
                HttpPost httpPost = new HttpPost(URL_LOGIN);
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
            if(s != null){
                Log.d("Exception", "onPostExecute: "+s);
                startActivity(new Intent(LoginActivity.this,MainActivity.class));
            }
            this.progressDialog.dismiss();
        }
    }

    private String registration(String email, String password){
        String json_body = null;
        try {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("email",email);
            jsonObject.put("password",password);
            json_body = jsonObject.toString(1);
        }catch (Exception e){
            Log.d("Exception", "registration: "+e);
        }
        return json_body;
    }
}

//    functions urls:
//
//
//        Function URL (signup): https://us-central1-rad-ul-fasaad.cloudfunctions.net/signup
//        + functions[login]: Successful update operation.
//        Function URL (login): https://us-central1-rad-ul-fasaad.cloudfunctions.net/login
//        + functions[webhook]: Successful create operation.
//        Function URL (webhook): https://us-central1-rad-ul-fasaad.cloudfunctions.net/webhook
//        + functions[talk]: Successful create operation.
//        Function URL (talk): https://us-central1-rad-ul-fasaad.cloudfunctions.net/talk


////////////////////

/*


login signup getprofile and talk apis are ready:
talk api will be used to to talk with chatbot
interfaces of api are following
are request are post



interface signup {
 firstName: string
 lastName: string
 phoneNumber: number
 email: string
 password: string
}
interface login {
 email: string
 password: string
}
interface profile {
 uid: string
 token: string
}




interface talk {
 platform: string, // 0 for web, 1 for android
 text: string,
 uid: string,
 token: string
}

 */