Ext.define('Admin.model.kas.Kas', {
    extend: 'Admin.model.Base',

    fields: [
        {
            type: 'int',
            name: 'id'
        },
        {
            type: 'string',
            name: 'kode'
        },
        {
            type: 'string',
            name: 'tanggal'
        },
        {
            type: 'string',
            name: 'jam'
        },
        {
            type: 'string',
            name: 'keterangan'
        },
        {
            type: 'string',
            name: 'jenis'
        },
        {
            type: 'int',
            name: 'jumlah'
        },
        {
            type: 'int',
            name: 'salo'
        },
        {
            type: 'string',
            name: 'bukti'
        },
        {
            type: 'int',
            name: 'id_pelanggan'
        }, 
        {
            type: 'string',
            name: 'nama_pelanggan'
        }
        
    ]
});