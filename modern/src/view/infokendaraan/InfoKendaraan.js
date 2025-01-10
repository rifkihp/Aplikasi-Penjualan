Ext.define('Admin.view.infokendaraan.InfoKendaraan', {
    extend: 'Ext.Container',
    xtype: 'infokendaraan',

    controller: 'infokendaraan',

    listeners: {
        show: 'onShow'
    },

    layout: 'hbox',
    
    cls: 'infokendaraan',
    
    items: []
});