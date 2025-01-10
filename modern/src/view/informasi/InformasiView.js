Ext.define('Admin.view.informasi.InformasiView', {
    extend: 'Ext.Panel',
    xtype: 'informasi-view',

    requires: [
        'Ext.Button',
        'Ext.dataview.DataView' 
    ],

    title: 'Detail Informasi',

    bbar: ['->', {
        ui: 'header',
        text: '<b>Kembali</b>',
        handler: 'onShow'
    }],

    listeners: {
        added: 'onLoadView'
    },

    items: [{
        xtype: 'dataview',
        cls: 'informasi',
        flex: 1,
        scrollable: true,
        store: {
            type:'informasi',
            autoLoad: false,
        },
        selectable: false,

        itemCls: 'informasi-item',
        itemTpl: new Ext.XTemplate(
            '<table class="table">',
                '<tbody>',
                    '<tr><th width="100%" colspan=2>{judul}<div class="right"><b>Tanggal {tanggal:date("d-m-Y")}</b></div></th></tr>',                            
                    '<tr><th width="23%">Kepada:</th><td width="77%">{kepada}</td></tr>',
                '</tbody>',
            '</table>',
            '<div class="time"><b>Detail Informasi:</b></div>',
            '<div>',
                '{penjelasan}',

                '<tpl if="audiofile !== \'\'">',
                    '<audio controls>',
                        '<source src="./server/public/uploads/berkas/{audiofile}" type="audio/mpeg">',
                    '</audio>',                           
                '</tpl>',
            
                '<tpl if="docfile !== \'\'">',
                    '<div class="time"><b>Lampiran:</b></div>',
                    '<a href="./server/public/uploads/berkas/{docfile}" target="_blank">{docfile}</a>',                           
                '</tpl>',
            '</div>'
        )
    }]
});
