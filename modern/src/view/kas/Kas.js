Ext.define('Admin.view.kas.Kas', {
    extend: 'Ext.Container',
    xtype: 'kas',

    controller: 'kas',

    listeners: {
        show: 'onShow'
    },

    layout: 'hbox',
    
    cls: 'cek-info-kendaraan',
    
    items: []
});