Ext.define('Admin.view.authentication.Login', {
    extend: 'Admin.view.authentication.AuthBase',
    xtype: 'login',

    requires: [
        'Ext.field.Checkbox',
        'Ext.field.Email',
        'Ext.field.Password',
        'Ext.layout.HBox'
    ],

    listeners : {
        show: 'onLoginResize'
    },

    items: [{
        xtype: 'formpanel',
        reference: 'loginform',

        bodyPadding: 20,
        defaults: {
            margin:'0 0 10 0'
        },
        
        items: [{
            xtype: 'component',
            html: '<div style="background-color: #8C8C8C; color: white; padding: 10px; font-size: 17px;">Login User</div>',
            margin: '5 0 15 0'
        }, {
            xtype: 'textfield',
            name: 'userid',
            placeholder: 'User ID'
        }, {
            xtype: 'passwordfield',
            name: 'password',
            placeholder: 'Password'
        }, {
            layout: 'hbox',
            items: [/*{
                xtype: 'checkboxfield',
                boxLabel: 'Remember Me'
            }, */ {
                xtype: 'component',
                html: '<a href="#passwordreset">Lupa Password</a>',
                margin: '5 0 5 0'
            }]
        }, {
            xtype: 'button',
            width: '100%',
            text: 'Login',
            iconAlign: 'right',
            iconCls: 'x-fa fa-angle-right',
            ui: 'confirm',
            handler: 'onSigninButton'
        }, /*{
            xtype: 'button',
            width: '100%',
            text: 'Login with Facebook',
            iconAlign: 'right',
            iconCls: 'x-fab fa-facebook',
            ui: 'facebook',
            handler: 'goToDashboard'
        },
        {
            xtype: 'component',
            html: '<div style="font-size: 14px; text-align: center;">atau</div>'
        }, */ 
        {
            xtype: 'button',
            width: '100%',
            margin: '5 0 0 0',
            text: 'Registrasi',
            ui: 'gray-button',
            iconAlign: 'right',
            iconCls: 'x-fa fa-user-plus',
            handler: 'onDaftarButton'
        }]
    }]
});
