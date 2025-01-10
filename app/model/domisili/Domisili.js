Ext.define('Admin.model.domisili.Domisili', {
    extend: 'Admin.model.Base',

    fields: [
        { 
            type: 'int', 
            name: 'id' 
        },
        { 
            type: 'int', 
            name: 'kodewil' 
        },
        { 
            type: 'auto', 
            name: 'propinsi'
        },
        { 
            type: 'auto', 
            name: 'kota' 
        },
        { 
            type: 'auto', 
            name: 'sandi_lok'
        }
    ]
});