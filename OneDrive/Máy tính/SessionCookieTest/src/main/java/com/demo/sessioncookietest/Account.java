/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.demo.sessioncookietest;

public class Account {
    private String username;
    private String password;
    public Account(){
        
    }
    public Account(String user, String pass){
        this.username = user;
        this.password = pass;
    }
    public String getUsername()
    {
        return username;
    }
    public String getPassword()
    {
        return password;
    }
}
