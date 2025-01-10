Ext.define('Admin.view.kas.KasList', {
    extend: 'Ext.Panel',
    xtype: 'kas-list',

    requires: [
        'Ext.dataview.DataView' 
    ],

    listeners: {
        added: 'onLoadList'
    },

    title: 'KAS',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [{
        xtype: 'dataview',
        flex: 1, 
        store: {
            type: 'kas',
            autoLoad: false
        },
        scrollable: true,
        itemCls: 'kas-item',
        emptyText: true,
        itemTpl: new Ext.XTemplate(
            '<div class="item{[xindex % 2 === 0 ? "-odd" : "-even"]}">',
                
                '<div class="title">', 
                    '<b>{kode}</b><br />{tanggal} {jam}<br />{keterangan}',

                    '<div class="selector-aktif">', 
                        '<label for="checkbox-aktif">Rp. {jumlah}</label>',
                    '</div>',
                
                        /*'<div class="selector">', 
                            '<button class="edit-btn" name="edit">Edit</button>', 
                            '<button class="hapus-btn" name="delete">Hapus</button>', 
                        '</div>',*/
                        
                    //'<p>&nbsp;</p>',
                    
                '</div>',

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
            text: '<b>Tambah Data KAS</b>',
            iconAlign: 'right',
            iconCls: 'x-fa fa-search',
            ui: 'confirm',
            width: '100%',
            handler: 'onAddButton',
            flex: 1
        }]
    }]
});
