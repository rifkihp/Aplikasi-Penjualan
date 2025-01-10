Ext.define('Admin.model.quiz.Quiz', {
    extend: 'Admin.model.Base',

    fields: [
        {
            type: 'int',
            name: 'id'
        },
        {
            type: 'string',
            name: 'judul'
        },
        {
            type: 'string',
            name: 'soal'
        },
        {
            type: 'string',
            name: 'audiofile'
        },
        {
            type: 'string',
            name: 'docfile'
        },  
        {
            type: 'string',
            name: 'pembahasan'
        },
        {
            type: 'string',
            name: 'audiofile_pembahasan'
        },
        {
            type: 'string',
            name: 'docfile_pembahasan'
        },
        {
            type: 'string',
            name: 'kelas'
        },
        {
            type: 'string',
            name: 'mapel'
        },
        {
            type: 'string',
            name: 'guru'
        },
        {
            type: 'string',
            name: 'mulai'
        },
        {
            type: 'string',
            name: 'selesai'
        },
        {
            type: 'bool',
            name: 'aktif'
        }
    ]
});