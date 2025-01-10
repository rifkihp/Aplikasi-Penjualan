Ext.define('Admin.view.cekinfokendaraan.CekInfoKendaraanController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cekinfokendaraan',

    onShow: function ( form, container, index, eOpts ) {
        var me = this,
            view = me.getView();

        view.removeAll();
        view.add({
            xtype: 'cekinfokendaraan-list',
            flex: 1
        });
    },

    onLoadList: function ( panel, container, index, eOpts ) {
        var user     = localStorage.getItem('m_user'),
            data     = JSON.parse(user),
            dataview = this.getView().down('dataview'),
            store    = dataview.getStore();

        store.load({
            params: {id_user: data[0]['id']},
            scope: this,
            callback: function(records, operation, success) {
                // the operation object
                // contains all of the details of the load operation
                //console.log(records);
            }
        });
    },
    
    onLoadView: function ( panel, container, index, eOpts ) {
        var dataview = panel.down('dataview');
        var store = dataview.getStore();
        store.loadRecords(panel.datarec);
    },

    onAddButton: function(btn) {
        var me     = this,
            view   = me.getView();
        
        setTimeout(function() {
            view.removeAll();    
            view.add({
                xtype:'cekinfokendaraan-edit',
                idEdit: 0,
                saveUrl: 'insert',
                title: 'Cek Info Kendaraan',
                flex: 1
            });
        }, 100);
    },

    onSave: function(btn) {
        var me   = this;
        var form = me.getView().down('cekinfokendaraan-edit');
        var user = localStorage.getItem('m_user');
        var data = JSON.parse(user);
        var kode_kota = form.down('#kode_kota').getValue();
        var nomor_kendaraan = form.down('#nomor_kendaraan').getValue();
        var kode_wilayah = form.down('#kode_wilayah').getValue();
        var nopol = kode_kota+nomor_kendaraan+kode_wilayah; 

        if (form.validate()) {
            Ext.Msg.confirm('Konfirmasi', 'Yakin untuk proses?',
                function(choice) {
                    if (choice === 'yes') {
                        form.waitMsgTarget = me.getView();
                        form.submit({
                            method:'POST',
                            url: './server/public/cekinfokendaraan/'+form.saveUrl,
                            waitMsg: 'Simpan...',
                            params: {
                                id_user: data[0]['id'],
                                nomor_polisi: nopol.toUpperCase(),
                                nopol_kode_kota: kode_kota.toUpperCase(),
                                nopol_kode_kendaraan: nomor_kendaraan.toUpperCase(),
                                nopol_kode_wilayah: kode_wilayah.toUpperCase(),                                
                                domisili: data[0]['city']+ ', '+data[0]['province'],
                                nama_pemohon: data[0]['nama']
                            },
                            success:function(frm, json) {
                                //var json = Ext.JSON.decode(action.response.responseText);
                                Ext.Msg.alert('Sukses', json['message'], function(btn, text) {
                                    me.onShow();
                                });
                            },
                            failure:function(frm, action) {
                                var json = Ext.JSON.decode(action.responseText);
                                Ext.Msg.alert('Error', json['message']);
                            }
                        });
                    }
                }, 
                this
            );
        }
    },

    onSelect: function( dataview, location, eOpts ) {
        var me     = this,
            target = location.source.target,
            record = location.record,
            view   = me.getView();
            
            if(target.name=='detail') {
                setTimeout(function() {
                    view.removeAll();
                    view.add({
                        xtype: 'cekinfokendaraan-view',
                        datarec: record,
                        flex: 1
                    });
                }, 100);
            } else
            if(target.name=='back') {
                setTimeout(function() {
                    me.onShow();
                }, 100);
            }    
    }
});
