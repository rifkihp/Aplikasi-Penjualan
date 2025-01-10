Ext.define('Admin.view.authentication.AuthController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.auth',

    onSigninButton: function(button) {
        
        var me = this;
        var form = me.lookup('loginform');

        form.submit({
            url: 'server/public/login',
            waitMsg: true,
            success: function(frm, action) {
                //untuk versi mobile parameter action sudah dalam format JSON
                localStorage.setItem('m_user', JSON.stringify(action['data']));
                localStorage.setItem('m_menu', JSON.stringify(action['menu']));
                
                me.redirectTo('dashboard', true);
            },
            failure: function(frm, action) {
                var json = Ext.JSON.decode(action.responseText);
                Ext.Msg.alert('Error', json['message']);
            }
        })
    },

    onDaftarButton: function(button) {
        var me = this;
        me.redirectTo('register', true);
    },

    onLoginButton: function(button) {
        var me = this;
        me.redirectTo('login', true);
    },

    onSignupClick:  function(button) {
        var me = this;
        var form = me.lookup('registerform');

        if (form.validate()) {
            Ext.Msg.confirm('Konfirmasi', 'Yakin untuk proses Registrasi?',
                function(choice) {
                    if (choice === 'yes') {
                        form.waitMsgTarget = me.getView();
                        form.submit({
                            method:'POST',
                            url: 'server/public/register',
                            waitMsg: 'Proses...',
                            success:function(frm, json) {
                                Ext.Msg.alert('Sukses', json['message'], function(btn, text) {
                                    form.reset();
                                    me.redirectTo('login', true);
                                });
                            },
                            failure:function(frm, action) {
                                Ext.Msg.alert('Error', action['message']);
                            }
                        });
                    }
                }, 
                this
            );
        }
    },

    onRegisterResize:  function(authdialog) {
        var me       = this,
            width    =  Ext.Element.getViewportWidth(),
            register = me.lookup('registerform');

        register.setWidth(Math.floor(width * 0.9));
    },

    onLoginResize:  function(authdialog) {
        var me       = this,
            width    =  Ext.Element.getViewportWidth(),
            register = me.lookup('loginform');

        register.setWidth(Math.floor(width * 0.8));
    },

    onProvinceSelect: function(combobox, record) {
        var me                = this,
            city              = me.getView().down('#city'),
            subdistrict       = me.getView().down('#subdistrict'),
            store_city        = city.getStore(),
            store_subdistrict = subdistrict.getStore();

        console.log('province select!');
        store_city.load({
            params: {province_id: record.data['province_id']},
            callback: function(records, operation, success) {
                
            }
        });
        city.reset();
        store_subdistrict.removeAll();
        subdistrict.reset();
    },
    
    onCitySelect: function(combobox, record) {
        var me                = this,
            subdistrict       = me.getView().down('#subdistrict'),
            store_subdistrict = subdistrict.getStore();

        console.log('city select!');
        store_subdistrict.load({
            params: {city_id: record.data['city_id']},
            callback: function(records, operation, success) {
                
            }
        });
        subdistrict.reset();
    }
    
});
