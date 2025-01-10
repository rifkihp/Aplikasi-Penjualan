Ext.define('Admin.view.quiz.QuizController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.quiz',

    onShow: function ( form, container, index, eOpts ) {
        var me = this,
            view = me.getView();

        view.removeAll();
        view.add({
            xtype: 'quiz-list',
            flex: 1
        });
    },

    onLoadList: function ( panel, container, index, eOpts ) {
        var dataview = this.getView().down('dataview'),
            store    = dataview.getStore();

        var user = localStorage.getItem('m_user');
        var data = JSON.parse(user);

        store.load({
            params: {id_guru: data[0]['id_tipe_user']}
        });
    },

    onLoadView: function ( panel, container, index, eOpts ) {
        var dataview = this.getView().down('dataview'),
        store        = dataview.getStore();

        store.loadRecords(panel.datarecord);
        setTimeout(function() {
            //console.log('mathml transform~');
            MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        });
    },

    onChildTap: function ( dataview, location, eOpts ) {
        var me = this;
        var data = location.record.data;
        var target = location.source.target;
        if(target.name=='view-button') {
            this.onView(location.record);
        } else
        if(target.name=='delete-button') {
            Ext.Msg.confirm('Delete', 'Yakin untuk hapus data yang dipilih?',
            function(choice) {
                console.log(choice);
                if (choice === 'yes') {
                    me.onDelete(data['id']);
                }
            }, this);
        } else
        if(target.name=='edit-button') {
            this.onActive(target, data['id']);
        } else
        if(target.name=='checkbox-aktif') {
            this.onActive(target, data['id']);
        }
    },

    onView: function(record) {
        var me = this,
            view = me.getView();

        view.removeAll();
        view.add({
            xtype: 'quiz-view',
            datarecord: record,
            flex: 1
        });
    },

    onEdit: function(id_quiz) {
        console.log('editt');
    },

    onDelete: function(id_quiz) {
        var me = this;
        Ext.Ajax.request({
            method:'GET',
            url: './server/public/quiz/'+id_quiz+'/delete',
            success: function(response) {
                me.onLoadList();
            },

            failure: function(response) {
                var json = Ext.JSON.decode(response.responseText);
                Ext.Msg.alert('Error', json['message']);
            }
        });
    },

    onActive: function(target, id_quiz) {
        //console.log(target.checked);
        var checked = !target.checked;
        Ext.Ajax.request({
            method:'POST',
            url: './server/public/quiz/'+id_quiz+'/aktif',
            params: {
                status: checked?1:0
            },
            success: function(response) {
            },

            failure: function(response) {
                target.checked = !target.checked;
                var json = Ext.JSON.decode(response.responseText);
                Ext.Msg.alert('Error', json['message']);
            }
        });
        
    }

});
