Ext.define('Admin.view.authentication.Register', {
    extend: 'Admin.view.authentication.LockingWindow',
    xtype: 'register',

    requires: [
        'Admin.view.authentication.Dialog',
        'Ext.button.Button',
        'Ext.form.Label',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Text'
    ],

    title: 'User Registration',
    defaultFocus: 'authdialog',  // Focus the Auth Form to force field focus as well

    items: [
        {
            xtype: 'authdialog',
            bodyPadding: '20 20',
            width: 455,
            reference : 'authDialog',

            defaultButton : 'submitButton',
            autoComplete: true,
            cls: 'auth-dialog-register',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            defaults : {
                margin: '10 0',
                selectOnFocus : true
            },
            items: [
                {
                    xtype: 'label',
                    cls: 'lock-screen-top-label',
                    text: 'Pendaftaran'
                },
                {
                    xtype: 'textfield',
                    cls: 'auth-textbox',
                    height: 55,
                    hideLabel: true,
                    allowBlank : false,
                    emptyText: 'Nama Lengkap',
                    name: 'fullName',
                    bind: '{fullName}',
                    triggers: {
                        glyphed: {
                            cls: 'trigger-glyph-noop auth-email-trigger'
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    cls: 'auth-textbox',
                    height: 55,
                    hideLabel: true,
                    allowBlank : false,
                    name: 'nohp',
                    bind: '{nohp}',
                    emptyText: 'No. HP (WA)',
                    triggers: {
                        glyphed: {
                            cls: 'trigger-glyph-noop auth-mobile-trigger'
                        }
                    }
                },

                /*{
                    xtype: 'textfield',
                    cls: 'auth-textbox',
                    height: 55,
                    hideLabel: true,
                    allowBlank : false,
                    name: 'email',
                    emptyText: 'Email',
                    vtype: 'email',
                    bind: '{email}',
                    triggers: {
                        glyphed: {
                            cls: 'trigger-glyph-noop auth-envelope-trigger'
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    cls: 'auth-textbox',
                    height: 55,
                    hideLabel: true,
                    allowBlank : false,
                    emptyText: 'Password',
                    name: 'password',
                    inputType: 'password',
                    bind: '{password}',
                    triggers: {
                        glyphed: {
                            cls: 'trigger-glyph-noop auth-password-trigger'
                        }
                    }
                },*/

                {
                    xtype: 'textfield',
                    cls: 'auth-textbox',
                    height: 55,
                    hideLabel: true,
                    allowBlank : false,
                    name: 'email',
                    emptyText: 'Email',
                    vtype: 'email',
                    bind: '{email}',
                    triggers: {
                        glyphed: {
                            cls: 'trigger-glyph-noop auth-envelope-trigger'
                        }
                    }
                },
                {
                    xtype: 'combobox',
                    cls: 'auth-textbox',
                    height: 55,
                    hideLabel: true,
                    allowBlank : false,
                    name: 'jurusan',
                    emptyText: 'Jurusan',
                    bind: '{jurusan}',
                    triggers: {
                        glyphed: {
                            cls: 'trigger-glyph-noop auth-envelope-trigger'
                        }
                    },
                    forceSelection: true,
                    store: Ext.create('Ext.data.Store', {
                        fields: [
                            {
                                type: 'int',
                                name: 'id'
                            },
                            {
                                type: 'string',
                                name: 'nama'
                            }
                        ],
                        data: [
                            {id: 1, nama: 'SAINTEK'},
                            {id: 2, nama: 'SOSHUM'}
                        ]
                    }),
                    valueField: 'id',
                    displayField: 'nama',
                    typeAhead: true,
                    queryMode: 'local'
                },
                {
                    xtype: 'checkbox',
                    flex: 1,
                    name: 'agrees',
                    cls: 'form-panel-font-color rememberMeCheckbox',
                    height: 32,
                    bind: '{agrees}',
                    allowBlank : false,
                    boxLabel: 'I agree with the Terms and Conditions',

                    // In this case, the form operation is not VALID unless Terms are agreed upon
                    isValid: function() {
                        var me = this;
                        return me.checked || me.disabled;
                    }
                },
                {
                    xtype: 'button',
                    scale: 'large',
                    ui: 'soft-blue',
                    formBind: true,
                    reference: 'submitButton',
                    bind: false,
                    margin: '5 0',
                    iconAlign: 'right',
                    iconCls: 'x-fa fa-angle-right',
                    text: 'Signup',
                    listeners: {
                        click: 'onSignupClick'
                    }
                }/*,
                {
                    xtype: 'box',
                    html: '<div class="outer-div"><div class="seperator">OR</div></div>'
                },
                {
                    xtype: 'button',
                    scale: 'large',
                    ui: 'facebook',
                    margin: '5 0',
                    iconAlign: 'right',
                    iconCls: 'x-fab fa-facebook',
                    text: 'Login with Facebook',
                    listeners: {
                        click: 'onFaceBookLogin'
                    }
                },
                {
                    xtype: 'component',
                    html: '<div style="text-align:right">' +
                        '<a href="#login" class="link-forgot-password">'+
                            'Back to Log In</a>' +
                        '</div>'
                }*/
            ]
        }
    ]
});