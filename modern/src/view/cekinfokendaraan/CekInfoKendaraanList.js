Ext.define('Admin.view.cekinfokendaraan.CekInfoKendaraanList', {
    extend: 'Ext.Panel',
    xtype: 'cekinfokendaraan-list',

    requires: [
        'Ext.dataview.DataView' 
    ],

    listeners: {
        added: 'onLoadList'
    },

    title: 'Cek Info Kendaraan',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [{
        xtype: 'dataview',
        flex: 1, 
        store: {
            type: 'cekinfokendaraan',
            autoLoad: false
        },
        scrollable: true,
        itemCls: 'cek-info-kendaraan-item',
        emptyText: true,
        itemTpl: new Ext.XTemplate(
            '<div class="item{[xindex % 2 === 0 ? "-odd" : "-even"]}">',
                
                    '<table class="table">',
                        '<tbody>',
                            '<tr><th width="22%">Waktu</th><th width="3%">:</th><td width="75%">{waktu_permintaan}</td></tr>',
                            '<tr><th width="22%">Pemohon</th><th width="3%">:</th><td width="75%">{nama_pemohon}</td></tr>',
                            '<tr><th width="22%">Domisili</th><th width="3%">:</th><td width="75%">{domisili}</td></tr>',
                            '<tr><th width="22%">Status</th><th width="3%">:</th><td width="75%">ANTRI</td></tr>',
                        '</tbody>',
                    '</table>',

                    '<tpl if="this.getModifiedAccess()">',
                        '<div class="selector">', 
                            '<button class="edit-btn" name="detail">Lihat Detail</button>',
                        '</div>',

                        '<p>&nbsp;</p>',
                    '</tpl>',

            '</div>',
            {
                getModifiedAccess: function() {
                    var user = JSON.parse(localStorage.getItem('m_user'))[0];
                    return user['tipe_user']<=2;
                },

                getChecked: function(value) {
                    return value==1;
                }
            }
        ),
        listeners: {
            childtap: 'onSelect'
        } 
    },
    {
        layout: 'hbox',
        margin: '0 10px 10px 10px',
        items: [{
            xtype: 'button',
            text: '<b>Cek Kendaran</b>',
            iconAlign: 'right',
            iconCls: 'x-fa fa-search',
            ui: 'confirm',
            width: '100%',
            handler: 'onAddButton',
            flex: 1
        }]
    }]
});
