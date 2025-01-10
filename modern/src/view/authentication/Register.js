Ext.define('Admin.view.authentication.Register', {
    extend: 'Admin.view.authentication.AuthBase',
    xtype: 'register',

    requires: [
        'Ext.field.Checkbox',
        'Ext.field.Email',
        'Ext.field.Password',
        'Ext.layout.HBox'
    ],
    
    listeners : {
        show: 'onRegisterResize'
    },

    items: [{
        xtype: 'formpanel',
        reference: 'registerform',
        scrollable: true,

        bodyPadding: 20,
        defaults: {
            margin:'0 0 10 0'
        },
        items: [{
            xtype: 'component',
            html: '<div style="background-color: #8C8C8C; color: white; padding: 10px; font-size: 17px;">Registrasi Aplikasi VeFo</div>'
        }, 
        {
            xtype: 'textfield',
            placeholder: 'Nama',
            name: 'nama',
            itemId: 'nama',
            required: true
        },
        {
            xtype: 'combobox',
            placeholder: 'Propinsi',
            name: 'province',
            itemId: 'province',
            
            store: {
                type: 'province',
                autoLoad: true
            },
            queryMode: 'local',
            valueField: 'province_id',
            displayField: 'province',
            listeners: {
                select: 'onProvinceSelect'
            },
            required: true
        },
        {
            xtype: 'combobox',
            placeholder: 'Kota / Kabupaten',
            name: 'city',
            itemId: 'city',

            store: {
                type: 'city',
                autoLoad: false
            },
            queryMode: 'local',
            valueField: 'city_id',
            displayField: 'city_name',
            listeners: {
                select: 'onCitySelect'
            },
            required: true
        },
        {
            xtype: 'combobox',
            placeholder: 'Kecamatan',
            name: 'subdistrict',
            itemId: 'subdistrict',
            
            store: {
                type: 'subdistrict',
                autoLoad: false
            },
            queryMode: 'local',
            valueField: 'subdistrict_id',
            displayField: 'subdistrict_name',
            required: true
        },
        {
            xtype: 'textfield',
            placeholder: 'No. HP (WA)',
            name: 'nohp',
            itemId: 'nohp',
            required: true
        }, 
        {
            xtype: 'emailfield',
            placeholder: 'Email',
            name: 'email',
            itemId: 'email',
            required: true
        }, 
        {
            xtype: 'textfield',
            placeholder: 'User ID',
            name: 'username',
            itemId: 'username',
            required: true
        }, 
        {
            xtype: 'passwordfield',
            placeholder: 'Password',
            name: 'password',
            itemId: 'password',
            required: true
        }, 
        {
            xtype: 'passwordfield',
            placeholder: 'Konfirmasi Password',
            name: 'konfirmasi_password',
            itemId: 'konfirmasi_password',
            required: true
        }, 
        /*{
            xtype: 'checkboxfield',
            boxLabel: 'I agree to the terms & conditions'
        },*/ 
        {
            xtype: 'button',
            text: 'SignUp',
            iconAlign: 'right',
            iconCls: 'x-fa fa-user-plus',
            ui: 'confirm',
            width: '100%',
            handler: 'onSignupClick'
        },
        {
            xtype: 'component',
            margin: 0,
            html: '<a href="#login">Back to Login</a>'
        }]
    }]
});
