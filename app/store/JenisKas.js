Ext.define('Admin.store.JenisKas', {
    extend: 'Ext.data.Store',

    alias: 'store.jeniskas',

    fields: [{
        type: 'string',
        name: 'kode'
    }, {
        type: 'string',
        name: 'nama'
    }],

    data: [
        {kode: 'MASUK', nama: 'Kas Masuk'}, 
        {kode: 'KELUAR', nama: 'Kas Keluar'}
    ]

});
