Ext.define('Admin.view.quiz.QuizList', {
    extend: 'Ext.Panel',
    xtype: 'quiz-list',

    requires: [
        'Ext.dataview.DataView' 
    ],

    scrollable: true,

    listeners: {
        added: 'onLoadList'
    },

    title: 'Quiz',
    
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    
    items: [{
        xtype: 'dataview',
        flex: 1, 
        store: {
            type: 'quiz',
            autoLoad: false
        },
        cls: 'quiz',
        selectedCls: 'quiz-item-selected',
        itemTpl:
        new Ext.XTemplate(
            '<tpl for=".">',
                '<div class="quiz-item">',
                    '<table class="table">',
                        '<tbody>',
                            '<tr><th width="100%" colspan=2>{judul}<div class="right"><input type="checkbox" name="checkbox-aktif" {[values.aktif === true ? "checked" : ""]}> <label for="checkbox-aktif">Aktif</label></div></th></tr>',                            
                            '<tr><th width="23%">Mapel</th><td width="77%">{mapel}<div class="right"><b>Kelas {kelas}</b></div></td></tr>',
                            '<tr><th width="23%">Guru</th><td width="77%">{guru}</td></tr>',
                            '<tr><th width="23%">Waktu</th><td width="77%">{mulai} sd. {selesai}</td></tr>',
                        '</tbody>',
                    '</table>',

                    '<div class="selector">',
                        '<button class="view space-right" name="view-button">Lihat</button>',
                        '<button class="delete space-right" name="delete-button">Hapus</button>',
                        '<button class="edit" name="edit-button">Edit</button>',
                    '</div>',
                '</div>',
            '</tpl>'
        ),
    
        listeners: {
            childtap: 'onChildTap'
        }          
        
    }]
});
