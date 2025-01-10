Ext.define('Admin.view.infokendaraan.InfoKendaraanList',{
    extend: 'Ext.panel.Panel',
    xtype: 'infokendaraan-list',

    requires: [
        'Ext.grid.Panel',
        'Ext.toolbar.Paging',
        'Ext.grid.column.Date'
    ],

    viewModel: {
        type: 'infokendaraan'
    },

    cls: 'shadow',
    
    items: [
        {
            xtype: 'gridpanel',
            itemId: 'grid-info-kendaraan',
            cls: 'info-kendaraan-grid',
            scrollable: false,
            border: false,
            title: 'Info Kendaraan',
            bind: '{results}',
            viewConfig: {
                preserveScrollOnRefresh: true,
                stripeRows: false
            },

            columns: [
                {
                    xtype: 'gridcolumn',
                    cls: 'content-column',
                    menuDisabled: true,
                    dataIndex: 'status', 
                    width: 120, 
                    text: 'Status', 
                    align: 'center', 
                    renderer: function(value, meta, record) {
                        if(value==0) {
                            meta.style = "color: white; font-weight: bold; color: #ffffff; background-color: #ff8c00;";
                            return 'Menunggu';
                        } else
                        if(value==1) {
                            meta.style = "color: white; font-weight: bold; color: #ffffff; background-color: #32cd32;";
                            return 'Tersedia';
                        } else 
                        if(value==2) {
                            meta.style = "color: white; font-weight: bold; color: #ffffff; background-color: #fe2712;";
                            return 'Tdk. Tersedia';
                        }
                        
                        return '';
                    }
                },
                {                    
                    xtype: 'gridcolumn',
                    cls: 'content-column',
                    menuDisabled: true,
                    dataIndex: 'nomor_polisi',
                    flex: 1,
                    text: 'No. Polisi',
                    align: 'center'
                },
                {
                    xtype: 'gridcolumn',
                    cls: 'content-column',
                    menuDisabled: true,
                    dataIndex: 'domisili',
                    text: 'Domisili',
                    flex: 1,
                    cellWrap: true
                },
                {
                    xtype: 'gridcolumn',
                    cls: 'content-column',
                    menuDisabled: true,
                    dataIndex: 'nama_pemohon',
                    text: 'Nama Pemohon',
                    flex: 1,
                    cellWrap: true
                },
                {                    
                    xtype: 'gridcolumn',
                    cls: 'content-column',
                    menuDisabled: true,
                    dataIndex: 'waktu_permintaan',
                    text: 'Permintaan',
                    align: 'center',
                    width: 150,
                    cellWrap: true
                },
                {
                    xtype: 'gridcolumn',
                    cls: 'content-column',
                    menuDisabled: true,
                    align: 'center',
                    text: 'Tayang',
                    columns: [{
                        xtype: 'gridcolumn',
                        cls: 'content-column',
                        menuDisabled: true,
                        dataIndex: 'waktu_tayang',
                        text: 'Waktu',
                        align: 'center',
                        width: 150,
                        cellWrap: true
                    },
                    {
                        xtype: 'checkcolumn',
                        cls: 'content-column',
                        menuDisabled: true,
                        align: 'center',
                        width: 90,
                        dataIndex: 'status',
                        text: 'Tayang',
                        listeners: {
                            checkChange: 'onTayangCheckChange'
                        }
                    }]
                },
                {    
                    xtype: 'actioncolumn',
                    cls: 'content-column',
                    items: [{
                        iconCls:'x-fa fa-edit',
                        handler: 'onBtnEditKendaraan'
                    }],
                    align: 'center',
                    menuDisabled: true,
                    width: 90,
                    text: 'Edit'
                }
            ],

            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: ['->', {
                    xtype: 'searchfield',
                    flex: 1,
                    store: {
                        type: 'infokendaraan'
                    }
                }]
            }, {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                displayInfo: true,
                bind: '{results}'
            }]
        }
    ]

});
