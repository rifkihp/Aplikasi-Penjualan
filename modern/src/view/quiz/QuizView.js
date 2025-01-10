Ext.define('Admin.view.quiz.QuizView', {
    extend: 'Ext.Panel',
    xtype: 'quiz-view',

    requires: [
        'Ext.Button',
        'Ext.dataview.DataView' 
    ],

    title: 'Quiz',
    
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

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
        cls: 'quiz',
        flex: 1,
        scrollable: true,
        store: {
            type:'quiz',
            autoLoad: false,
        },

        itemCls: 'quiz-item',
        itemTpl: new Ext.XTemplate(
            '<table class="table">',
                '<tbody>',
                    '<tr><th width="100%" colspan=2>{judul}<div class="right"><b>Kelas {kelas}</b></div></th></tr>',                            
                    '<tr><th width="23%">Mapel</th><td width="77%">{mapel}</td></tr>',
                    '<tr><th width="23%">Guru</th><td width="77%">{guru}</td></tr>',
                    '<tr><th width="23%">Waktu</th><td width="77%">{mulai} sd. {selesai}</td></tr>',
                '</tbody>',
            '</table>',
            '<div class="time"><b>Soal:</b></div>',
            '<div>',
                '{soal}',

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
