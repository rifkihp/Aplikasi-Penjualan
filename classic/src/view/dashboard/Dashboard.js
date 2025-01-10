Ext.define('Admin.view.dashboard.Dashboard', {
    extend: 'Ext.container.Container',
    xtype: 'admindashboard',

    requires: [
        'Ext.ux.layout.ResponsiveColumn'
    ],

    controller: 'dashboard',
    viewModel: {
        type: 'dashboard'
    },

    layout: 'responsivecolumn',
    
    listeners: {
        hide: 'onHideView'
    },

    items: [
        {
            xtype: 'weather',
            cls: 'weather-panel shadow',
            userCls: 'big-25 small-100'
        },
        {
            xtype: 'weather',
            cls: 'weather-panel shadow',
            userCls: 'big-25 small-100'
        },
        {
            xtype: 'weather',
            cls: 'weather-panel shadow',
            userCls: 'big-25 small-100'
        },
        {
            xtype: 'weather',
            cls: 'weather-panel shadow',
            userCls: 'big-25 small-100'
        }
    ]
});
