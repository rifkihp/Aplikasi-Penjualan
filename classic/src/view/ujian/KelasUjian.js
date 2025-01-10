Ext.define('Admin.view.ujian.KelasUjian', {
    extend: 'Ext.form.Panel',
    xtype: 'kelasujian-edit',
    
    requires: [
        'Ext.button.Button',
        'Ext.tree.Panel'
    ],

    controller: 'ujian',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    bodyPadding: 10,
    scrollable: true,

    constructor: function(config) {
        var me = this;

        Ext.create('Ext.data.Store', {
            storeId: 'ujianStore',
            fields:[ 'nama', 'kelas', 'mapel'],
            data: config.data
        });

        var render = function(value, meta, record) {
            return '<b>'+value+'</b>';
        }

        Ext.apply(config, {

            items: [{
                xtype: 'gridpanel',
                cls: 'kelasujian-grid',
                border: true,
                store: Ext.data.StoreManager.lookup('ujianStore'),
                columns: [{
                    xtype: 'gridcolumn',
                    cls: 'content-column',
                    menuDisabled: true,
                    dataIndex: 'nama',
                    text: 'Nama Ujian',
                    renderer: render,
                    flex: 0.7
                },
                {
                    xtype: 'gridcolumn',
                    cls: 'content-column',
                    menuDisabled: true,
                    dataIndex: 'kelas',
                    text: 'Kelas',
                    renderer: render,
                    flex: 0.7
                },
                {
                    xtype: 'gridcolumn',
                    cls: 'content-column',
                    menuDisabled: true,
                    dataIndex: 'mapel',
                    text: 'Mapel',
                    renderer: render,
                    flex: 1
                }]
            }, 
            {
                xtype: 'panel',
                height: 10
            },
            {
                xtype: 'treepanel',
                cls: 'kelasujian-grid',
                itemId: 'tree',
                flex: 1,
                useArrows: true,
                rootVisible: false,
                border: true,
                //bind: '{kelasujian}',
                store: Ext.create('Ext.data.TreeStore', {
                    fields: [
                        {name: 'id_', type: 'int'},        
                        {name: 'kode', type: 'string'},        
                        {name: 'nama', type: 'string'},        
                        {name: 'lm1', type: 'bool'},        
                        {name: 'lm2', type: 'bool'}
                    ],
                    proxy: {
                        type: 'ajax',
                        url: './server/public/kelas/'+config.idUjian+'/kelasujian',
                        reader: {
                            type: 'json',
                            rootProperty: 'children'
                        }
                   },

                   autoLoad: true
                }),
                columns: [
                    {xtype: 'treecolumn', cls: 'content-column', text: 'Kelas / Ruang', flex: 1, dataIndex: 'kode'},
                    {xtype:'checkcolumn', cls: 'content-column', text: 'Lintas Minat 1', flex: 0.7, dataIndex: 'lm1', renderer: 
                        function(value, meta, record) {
                            if (!record.get('leaf')) {
                                return '';
                            } else {
                                return (new Ext.ux.CheckColumn()).renderer(value);
                            }
                        },
                        listeners: {
                            checkChange: function(fld, rowIndex, checked, record, e, eOpts) {
                                if(checked==true && record.data['checked']==false) {
                                    record.set('checked', true);
                                    var treepanel = me.down('#tree');
                                    treepanel.fireEvent('checkchange', record, checked);
                                }

                                if(checked==false && record.data['lm2']==false && record.data['checked']==true) {
                                    record.set('checked', false);
                                    var treepanel = me.down('#tree');
                                    treepanel.fireEvent('checkchange', record, checked);
                                }
                            }
                        }        
                    },
                    {xtype:'checkcolumn', text: 'Lintas Minat 2', flex: 0.7, dataIndex: 'lm2', renderer: 
                        function(value, meta, record) {
                            if (!record.get('leaf')) {
                                return '';
                            } else {
                                return (new Ext.ux.CheckColumn()).renderer(value);
                            }
                        },
                        listeners: {
                            checkChange: function(fld, rowIndex, checked, record, e, eOpts) {
                                if(checked==true && record.data['checked']==false) {
                                    record.set('checked', true);
                                    var treepanel = me.down('#tree');
                                    treepanel.fireEvent('checkchange', record, checked);
                                }

                                if(checked==false && record.data['lm1']==false && record.data['checked']==true) {
                                    record.set('checked', false);
                                    var treepanel = me.down('#tree');
                                    treepanel.fireEvent('checkchange', record, checked);
                                }
                            }
                        }          
                    }                
                ],
                listeners: {
                    checkchange: function(node, check) {
                        for(var i=0; i<node.childNodes.length; i++) {
                            node.childNodes[i].set('checked', check);
                            this.fireEvent('checkchange', node.childNodes[i], check);
                        }

                        if(!check && node.childNodes.length==0) {
                            node.set('lm1', false);
                            node.set('lm2', false);
                            
                            for(i=0; i<node.parentNode.childNodes.length; i++)
                                if(node.parentNode.childNodes[i].data['checked']) return;

                            node.parentNode.set('checked', check);
                        }                       
                        if(check && node.childNodes.length==0) node.parentNode.set('checked', check);
                    }
                }
            }],

            bbar: {
                overflowHandler: 'menu',
                items: [
                    '->',
                    {
                        xtype: 'button',
                        width: 80,
                        ui: 'soft-red',
                        text: 'Batal',
                        handler: 'onCancelPilihKelasClick'
                    },
                    {
                        xtype: 'button',
                        width: 80,
                        ui: 'soft-green',
                        text: 'Simpan',
                        handler: 'onSavePilihKelasClick'
                    }
                ]
            }
        });

        this.callParent(arguments);
    },

    getDetail: function() {
        var me = this;

        var tree = me.down('#tree'),
            root = tree.getRootNode(),
            str = me.loopData(root, '');
                    
        //console.log(str);
        return str;
    },
    
    loopData: function(parent, str) {
       for(var i=0; i<parent.childNodes.length; i++) {
          var rec_0 = parent.childNodes[i];
          
          if(rec_0.childNodes.length>0 && rec_0.childNodes[0].childNodes.length>0) {
             str = this.loopData(rec_0, str);
          } else {
             if(rec_0.childNodes.length>0) {
                for(var j=0; j<rec_0.childNodes.length; j++) {
                    var rec_1 = rec_0.childNodes[j];
                    if(rec_1.data['checked']) {
                        str += (str!=''?',':'') + rec_1.data['id_']+'|'+rec_1.data['lm1']+'|'+rec_1.data['lm2'];
                    }
                 }
             } else {
                if(rec_0.data['checked']) {
                    str += (str!=''?',':'') + rec_0.data['id_']+'|'+rec_0.data['lm1']+'|'+rec_0.data['lm2'];
                }
             }             
          }         
       }
       
       return str;
    }

    
});