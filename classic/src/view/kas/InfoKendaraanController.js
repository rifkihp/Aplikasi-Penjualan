Ext.define('Admin.view.infokendaraan.InfoKendaraanController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.infokendaraan',

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
        var dataview = form.down('#dataview-infokendaraan');
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
                url: './server/public/infokendaraan/'+form.idEdit+'/load',
                success: function (frm, action) {
                    //var json       = Ext.JSON.decode(action.response.responseText);
                    var view         = me.getView();
                    var nama_pemilik = view.down('#nama_pemilik');

                    nama_pemilik.focus(true, 10);
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
        var form      = view.down('infokendaraan-edit');

        if(!form.getForm().isValid()) return;
        Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk proses simpan data?', function(btn, text) {
            if(btn=='yes') {
                form.getForm().waitMsgTarget = form.getEl();
                form.getForm().submit({
                    method:'POST',
                    url: './server/public/infokendaraan/'+form.saveUrl,
                    waitMsg: 'Simpan...',
                    success:function(frm, action) {
                        var json = Ext.JSON.decode(action.response.responseText);
                        Ext.Msg.alert('Sukses', json['message'], function(btn, text) {
                            me.redirectTo('infokendaraan-list', true);
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
        this.redirectTo('infokendaraan-list', true);
    },

    onBtnViewinfokendaraan: function(view, rowIndex, colIndex, item, e, record, row, action) {
        this.setCurrentView('infokendaraan-view', {
            openWindow: true, // Let the controller know that we want this component in the window,
            targetCfg: {
                datarecord: record
            },
            windowCfg: {
                // Any configs that you would like to apply for window popup goes here
                title: 'infokendaraan',
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
                xtype: 'infokendaraanwindow',
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

    onBtnEditInfoKendaraan: function(column, rowIndex, checked, eOpts) {
        var grid_infokendaraan = this.getView().down('#grid-info-kendaraan');
        var store              = grid_infokendaraan.getStore();
        var id_infokendaraan   = store.getAt(rowIndex).data['id'];

        this.setCurrentView('infokendaraan-edit', {
            saveUrl: id_infokendaraan+'/update',
            idEdit: id_infokendaraan,
            title: 'Edit Info Kendaraan' 
        });
    },

    setBbnkbJumlah: function(form) {
        var bbnkb_pokok                = Number(form.down('#bbnkb_pokok').getSubmitValue());
        var bbnkb_sanksi_administratif = Number(form.down('#bbnkb_sanksi_administratif').getSubmitValue());
        var bbnkb_jumlah               = bbnkb_pokok+bbnkb_sanksi_administratif;
        form.down('#bbnkb_jumlah').setValue(bbnkb_jumlah);
    },

    setPkbJumlah: function(form) {
        var pkb_pokok                = Number(form.down('#pkb_pokok').getSubmitValue());
        var pkb_sanksi_administratif = Number(form.down('#pkb_sanksi_administratif').getSubmitValue());
        var pkb_jumlah               = pkb_pokok+pkb_sanksi_administratif;
        form.down('#pkb_jumlah').setValue(pkb_jumlah);
    },

    setSdwklljJumlah: function(form) {
        var sdwkllj_pokok                = Number(form.down('#sdwkllj_pokok').getSubmitValue());
        var sdwkllj_sanksi_administratif = Number(form.down('#sdwkllj_sanksi_administratif').getSubmitValue());
        var sdwkllj_jumlah               = sdwkllj_pokok+sdwkllj_sanksi_administratif;
        form.down('#sdwkllj_jumlah').setValue(sdwkllj_jumlah);
    },

    setBeaStnkJumlah: function(form) {
        var bea_stnk_pokok                = Number(form.down('#bea_stnk_pokok').getSubmitValue());
        var bea_stnk_sanksi_administratif = Number(form.down('#bea_stnk_sanksi_administratif').getSubmitValue());
        var bea_stnk_jumlah               = bea_stnk_pokok+bea_stnk_sanksi_administratif;
        form.down('#bea_stnk_jumlah').setValue(bea_stnk_jumlah);
    },

    setBeaTnkbJumlah: function(form) {
        var bea_tnkb_pokok                = Number(form.down('#bea_tnkb_pokok').getSubmitValue());
        var bea_tnkb_sanksi_administratif = Number(form.down('#bea_tnkb_sanksi_administratif').getSubmitValue());
        var bea_tnkb_jumlah               = bea_tnkb_pokok+bea_tnkb_sanksi_administratif;
        form.down('#bea_tnkb_jumlah').setValue(bea_tnkb_jumlah);
    },

    setJumlahPokok: function(form) {
        var bbnkb_pokok                = Number(form.down('#bbnkb_pokok').getSubmitValue());
        var pkb_pokok                  = Number(form.down('#pkb_pokok').getSubmitValue());
        var sdwkllj_pokok              = Number(form.down('#sdwkllj_pokok').getSubmitValue());
        var bea_stnk_pokok             = Number(form.down('#bea_stnk_pokok').getSubmitValue());
        var bea_tnkb_pokok             = Number(form.down('#bea_tnkb_pokok').getSubmitValue());
        var jumlah_pokok               = bbnkb_pokok+pkb_pokok+sdwkllj_pokok+bea_stnk_pokok+bea_tnkb_pokok;
        form.down('#jumlah_pokok').setValue(jumlah_pokok);
    },

    setJumlahSanksiAdministratif: function(form) {
        var bbnkb_sanksi_administratif    = Number(form.down('#bbnkb_sanksi_administratif').getSubmitValue());
        var pkb_sanksi_administratif      = Number(form.down('#pkb_sanksi_administratif').getSubmitValue());
        var sdwkllj_sanksi_administratif  = Number(form.down('#sdwkllj_sanksi_administratif').getSubmitValue());
        var bea_stnk_sanksi_administratif = Number(form.down('#bea_stnk_sanksi_administratif').getSubmitValue());
        var bea_tnkb_sanksi_administratif = Number(form.down('#bea_tnkb_sanksi_administratif').getSubmitValue());
        var jumlah_sanksi_administratif   = bbnkb_sanksi_administratif+pkb_sanksi_administratif+sdwkllj_sanksi_administratif+bea_stnk_sanksi_administratif+bea_tnkb_sanksi_administratif;
        form.down('#jumlah_sanksi_administratif').setValue(jumlah_sanksi_administratif);
    },

    setJumlahTotal: function(form) {
        var jumlah_pokok                  = Number(form.down('#jumlah_pokok').getSubmitValue());
        var jumlah_sanksi_administratif   = Number(form.down('#jumlah_sanksi_administratif').getSubmitValue());
        var jumlah_total                  = jumlah_pokok+jumlah_sanksi_administratif;
        form.down('#jumlah_total').setValue(jumlah_total);
    },

    onBbnkbPokokChange: function(field, record, e) {
        var me   = this;
        var view = me.getView();
        var form = view.down('infokendaraan-edit');
        me.setBbnkbJumlah(form);   //sum ke kanan
        me.setJumlahPokok(form);   //sum ke bawah
    },

    onBbnkbSanksiAdministratifChange: function(field, record, e) {
        var me   = this;
        var view = me.getView();
        var form = view.down('infokendaraan-edit');
        me.setBbnkbJumlah(form);                 //sum ke kanan
        me.setJumlahSanksiAdministratif(form);   //sum ke bawah
    },

    onPkbPokokChange: function(field, record, e) {
        var me          = this;
        var view        = me.getView();
        var form        = view.down('infokendaraan-edit');
        me.setPkbJumlah(form);     //sum ke kanan
        me.setJumlahPokok(form);   //sum ke bawah
    },

    onPkbSanksiAdministratifChange: function(field, record, e) {
        var me   = this;
        var view = me.getView();
        var form = view.down('infokendaraan-edit');
        me.setPkbJumlah(form);                   //sum ke kanan
        me.setJumlahSanksiAdministratif(form);   //sum ke bawah
    },

    onSdwklljPokokChange: function(field, record, e) {
        var me          = this;
        var view        = me.getView();
        var form        = view.down('infokendaraan-edit');
        me.setSdwklljJumlah(form); //sum ke kanan
        me.setJumlahPokok(form);   //sum ke bawah
    },

    onSdwklljSanksiAdministratifChange: function(field, record, e) {
        var me   = this;
        var view = me.getView();
        var form = view.down('infokendaraan-edit');
        me.setSdwklljJumlah(form);               //sum ke kanan
        me.setJumlahSanksiAdministratif(form);   //sum ke bawah
    },

    onSdwklljPokokChange: function(field, record, e) {
        var me          = this;
        var view        = me.getView();
        var form        = view.down('infokendaraan-edit');
        me.setSdwklljJumlah(form); //sum ke kanan
        me.setJumlahPokok(form);   //sum ke bawah
    },

    onSdwklljSanksiAdministratifChange: function(field, record, e) {
        var me   = this;
        var view = me.getView();
        var form = view.down('infokendaraan-edit');
        me.setSdwklljJumlah(form);               //sum ke kanan
        me.setJumlahSanksiAdministratif(form);   //sum ke bawah
    },

    onBeaStnkPokokChange: function(field, record, e) {
        var me          = this;
        var view        = me.getView();
        var form        = view.down('infokendaraan-edit');
        me.setBeaStnkJumlah(form); //sum ke kanan
        me.setJumlahPokok(form);   //sum ke bawah
    },

    onBeaStnkSanksiAdministratifChange: function(field, record, e) {
        var me   = this;
        var view = me.getView();
        var form = view.down('infokendaraan-edit');
        me.setBeaStnkJumlah(form);               //sum ke kanan
        me.setJumlahSanksiAdministratif(form);   //sum ke bawah
    },

    onBeaTnkbPokokChange: function(field, record, e) {
        var me          = this;
        var view        = me.getView();
        var form        = view.down('infokendaraan-edit');
        me.setBeaTnkbJumlah(form); //sum ke kanan
        me.setJumlahPokok(form);   //sum ke bawah
    },

    onBeaTnkbSanksiAdministratifChange: function(field, record, e) {
        var me   = this;
        var view = me.getView();
        var form = view.down('infokendaraan-edit');
        me.setBeaTnkbJumlah(form);               //sum ke kanan
        me.setJumlahSanksiAdministratif(form);   //sum ke bawah
    },

    onJumlahPokokChange: function(field, record, e) {
        var me   = this;
        var view = me.getView();
        var form = view.down('infokendaraan-edit');
        me.setJumlahTotal(form);
    },

    onJumlahSanksiAdministratifChange: function(field, record, e) {
        var me   = this;
        var view = me.getView();
        var form = view.down('infokendaraan-edit');
        me.setJumlahTotal(form);
    },

    onTayangCheckChange: function(column, rowIndex, checked, eOpts) {
        var grid_info_kendaraan = this.getView().down('#grid-info-kendaraan');
        var store          = grid_info_kendaraan.getStore();
        var id_info_kendaraan   = store.getAt(rowIndex).data['id'];

        Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk merubah status tayang?', function(btn,text) {
            if(btn=='yes') {
                Ext.Ajax.request({
                    method:'POST',
                    url: './server/public/infokendaraan/'+id_info_kendaraan+'/tayang',
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
