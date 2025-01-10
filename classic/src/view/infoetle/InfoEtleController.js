Ext.define('Admin.view.infoetle.InfoEtleController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.infoetle',

    init: function() {
        var me = this;
        var viewType = me.getView().viewType;
        console.log(viewType);
        this.setCurrentView(viewType);
    },

    onViewLoad: function(form) {
        var judul    = form.down('[name=judul]');
        var kepada    = form.down('[name=kepada]');
        var tanggal    = form.down('[name=tanggal]');
        var dataview = form.down('#dataview-infoetle');
        var store    = dataview.getStore();

        //console.log(form.datarecord);
        store.loadRecords(form.datarecord);
        store.loadRecords(form.datarecord);

        judul.setValue(form.datarecord.data['judul']);
        kepada.setValue(form.datarecord.data['kepada']);
        tanggal.setValue(form.datarecord.data['tanggal']);
    },

    onFormLoad: function(form) {
        var me = this;
        if(form.idEdit) {        
            form.getForm().load({
                //waitMsg: 'Loading...',
                method: 'GET',
                url: './server/public/infoetle/'+form.idEdit+'/load',
                success: function (frm, action) {
                    var json = Ext.JSON.decode(action.response.responseText);
                    var view = me.getView();
                    
                    view.down('#etle_tangkap_layar_1').setValue(json.data['etle_tangkap_layar_1']);
                    view.down('#etle_tangkap_layar_2').setValue(json.data['etle_tangkap_layar_2']);
                    view.down('#etle_tangkap_layar_3').setValue(json.data['etle_tangkap_layar_3']);
                    view.down('#etle_tangkap_layar_4').setValue(json.data['etle_tangkap_layar_4']);
                    view.down('#etle_tangkap_layar_5').setValue(json.data['etle_tangkap_layar_5']);
                    view.down('#etle_tangkap_layar_6').setValue(json.data['etle_tangkap_layar_6']);
                },
                failure: function (frm, action) {
                    var json = Ext.JSON.decode(action.response.responseText);

                    Ext.MessageBox.show({
                        title: 'Error',
                        msg: json['message'],
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
            });
        }
    },

    onSaveButtonClick: function(btn) {
        var me        = this;
        var view      = me.getView();
        var form      = view.down('infoetle-edit');
        var tangkap_1 = form.down('#etle_tangkap_layar_1');
        var tangkap_2 = form.down('#etle_tangkap_layar_2');
        var tangkap_3 = form.down('#etle_tangkap_layar_3');
        var tangkap_4 = form.down('#etle_tangkap_layar_4');
        var tangkap_5 = form.down('#etle_tangkap_layar_5');
        var tangkap_6 = form.down('#etle_tangkap_layar_6');

        if(!form.getForm().isValid()) return;
        Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk proses simpan data?', function(btn, text) {
            if(btn=='yes') {
                form.getForm().waitMsgTarget = form.getEl();
                form.getForm().submit({
                    method:'POST',
                    url: './server/public/infoetle/'+form.saveUrl,
                    waitMsg: 'Simpan...',
                    params: {
                        'tangkap_layar_1': tangkap_1.getValue(),
                        'tangkap_layar_2': tangkap_2.getValue(),
                        'tangkap_layar_3': tangkap_3.getValue(),
                        'tangkap_layar_4': tangkap_4.getValue(),
                        'tangkap_layar_5': tangkap_5.getValue(),
                        'tangkap_layar_6': tangkap_6.getValue()
                    },
                    success:function(frm, action) {
                        var json = Ext.JSON.decode(action.response.responseText);
                        Ext.Msg.alert('Sukses', json['message'], function(btn, text) {
                            me.redirectTo('infoetle-list', true);
                        });
                    },
                    failure:function(frm, action) {
                        var json = Ext.JSON.decode(action.response.responseText);
                        Ext.MessageBox.show({
                            title: 'Gagal',
                            msg: json['message'],
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR
                        })
                    }
                });
            }
        });
    },

    onCancelButtonClick: function(btn) {
        this.redirectTo('infoetle-list', true);
    },

    onBtnViewinfoetle: function(view, rowIndex, colIndex, item, e, record, row, action) {
        this.setCurrentView('infoetle-view', {
            openWindow: true, // Let the controller know that we want this component in the window,
            targetCfg: {
                datarecord: record
            },
            windowCfg: {
                // Any configs that you would like to apply for window popup goes here
                title: 'infoetle',
                width: 900,
                height: 720
            }
        });
    },
    
    setCurrentView: function(view, params) {
        var me = this;
        var contentPanel = this.getView().down('#contentPanel');

        //We skip rendering for the following scenarios:
        // * There is no contentPanel
        // * view xtype is not specified
        // * current view is the same
        if(!contentPanel || view === '' || (contentPanel.down() && contentPanel.down().xtype === view)){
            return false;
        }

        if (params && params.openWindow) {
            var cfg = Ext.apply({
                xtype: 'infoetlewindow',
                items: [
                    Ext.apply({
                        xtype: view
                    }, params.targetCfg)
                ]
            }, params.windowCfg);

            Ext.create(cfg);
        } else {
            Ext.suspendLayouts();

            contentPanel.removeAll(true);
            contentPanel.add(
                Ext.apply({
                    xtype: view,
                    flex: 1
                }, params)
            );

            Ext.resumeLayouts(true);
            me.fireEvent('goontop');
        }
    },

    onBtnEditInfoEtle: function(column, rowIndex, checked, eOpts) {
        var grid_infoetle = this.getView().down('#grid-info-etle');
        var store              = grid_infoetle.getStore();
        var id_infoetle   = store.getAt(rowIndex).data['id'];

        this.setCurrentView('infoetle-edit', {
            saveUrl: id_infoetle+'/update',
            idEdit: id_infoetle,
            title: 'Edit Info ETLE' 
        });
    },

    onTayangCheckChange: function(column, rowIndex, checked, eOpts) {
        var grid_info_etle = this.getView().down('#grid-info-etle');
        var store          = grid_info_etle.getStore();
        var id_info_etle   = store.getAt(rowIndex).data['id'];

        Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk merubah status tayang?', function(btn,text) {
            if(btn=='yes') {
                Ext.Ajax.request({
                    method:'POST',
                    url: './server/public/infoetle/'+id_info_etle+'/tayang',
                    params: {
                        status: checked?1:0
                    },
                    success: function(response) {
                        var json = Ext.JSON.decode(response.responseText);
                        store.getAt(rowIndex).set('waktu_tayang', json['waktu_tayang']);
                        store.getAt(rowIndex).commit();
                    },

                    failure: function(response) {
                        //myMask.hide();
                        var json = Ext.JSON.decode(response.responseText);

                        Ext.MessageBox.show({
                            title: 'Error',
                            msg: json['message'],
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR,
                            fn : function(buttonValue, inputText, showConfig) {
                                store.getAt(rowIndex).set('status', !checked);   
                            }
                        });
                    }
                });
            } else {
                store.getAt(rowIndex).set('status', !checked);
            }
        });
    }
    
});
