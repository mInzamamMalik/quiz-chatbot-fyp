package com.example.ikodepc_1.raddulfasad;

import android.app.ProgressDialog;
import android.content.Intent;
import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.example.ikodepc_1.raddulfasad.interfaces.CommonMethods;
import com.example.ikodepc_1.raddulfasad.utils.Util;

public class LoginActivity extends AppCompatActivity implements CommonMethods,View.OnClickListener {

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
            return null;
        }

        @Override
        protected void onPostExecute(String s) {
            super.onPostExecute(s);
            this.progressDialog.dismiss();
        }
    }
}
