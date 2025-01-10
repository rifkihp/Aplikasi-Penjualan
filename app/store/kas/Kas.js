Ext.define('Admin.store.kas.Kas', {
    extend: 'Ext.data.Store',

    alias: 'store.kas',

    model: 'Admin.model.kas.Kas',

    pageSize: 25,
    
    proxy: {
        type: 'ajax',
        url: './server/public/kas',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: false,

    /*sorters: {
        direction: 'ASC',
        property: 'title'
    }*/
});
