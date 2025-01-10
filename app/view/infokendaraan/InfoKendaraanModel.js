Ext.define('Admin.view.infokendaraan.InfoKendaraanModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.infokendaraan',
    
    stores: {
        results: {
            type: 'infokendaraan'
        }
    }

});
