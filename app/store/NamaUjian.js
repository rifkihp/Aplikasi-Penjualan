Ext.define('Admin.store.NamaUjian', {
    extend: 'Ext.data.Store',

    alias: 'store.namaujian',

    fields: [{
        type: 'int',
        name: 'id'
    }, 
    {
        type: 'string',
        name: 'nama'
    }],

    data: [
        {id: 1, nama: 'UAS'}, 
        {id: 2, nama: 'UTS'}, 
        {id: 3, nama: 'TRY OUT'}
    ]

});
