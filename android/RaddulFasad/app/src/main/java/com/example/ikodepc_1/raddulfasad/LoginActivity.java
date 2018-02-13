package com.example.ikodepc_1.raddulfasad;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.example.ikodepc_1.raddulfasad.interfaces.CommonMethods;

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
                break;
            case R.id.signup_link:
                startActivity(new Intent(LoginActivity.this,SignUpActivity.class));
                break;
        }
    }
}
