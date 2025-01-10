Ext.define('Admin.view.cekinfokendaraan.CekInfoKendaraan', {
    extend: 'Ext.Container',
    xtype: 'cekinfokendaraan',

    controller: 'cekinfokendaraan',

    listeners: {
        show: 'onShow'
    },

    layout: 'hbox',
    
    cls: 'cek-info-kendaraan',
    
    items: []
});