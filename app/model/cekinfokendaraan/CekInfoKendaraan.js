Ext.define('Admin.model.cekinfokendaraan.CekInfoKendaraan', {
    extend: 'Admin.model.Base',

    fields: [
        {
            type: 'int',
            name: 'id'
        },
        {
            type: 'string',
            name: 'nomor_polisi'
        },
        {
            type: 'string',
            name: 'nopol_kode_kota'
        },
        {
            type: 'string',
            name: 'nopol_kode_kendaraan'
        },
        {
            type: 'string',
            name: 'nopol_kode_wilayah'
        },
        {
            type: 'string',
            name: 'domisili'
        },
        {
            type: 'string',
            name: 'waktu_permintaan'
        },
        {
            type: 'string',
            name: 'nama_pemohon'
        },
        {
            type: 'int',
            name: 'status_info_kendaraan'
        }, 
        {
            type: 'int',
            name: 'status_info_etle'
        }, 


        //info kendaraan
        {
            type: 'string',
            name: 'nama_pemilik'
        }, 
        {
            type: 'string',
            name: 'alamat'
        }, 

        {
            type: 'string',
            name: 'kota_kabupaten'
        },
        {
            type: 'string',
            name: 'kd_jenis_kb'
        },
        {
            type: 'string',
            name: 'kd_merek_kb'
        }, 
        {
            type: 'string',
            name: 'kd_fungsi'
        }, 
        {
            type: 'string',
            name: 'type'
        }, 
        {
            type: 'string',
            name: 'tahun_pembuatan'
        }, 
        {
            type: 'string',
            name: 'nomor_bpkb'
        }, 
        {
            type: 'string',
            name: 'warna_kb'
        }, 

        //right side
        {
            type: 'string',
            name: 'jumlah_cc'
        }, 
        {
            type: 'string',
            name: 'no_rangka'
        }, 
        {
            type: 'string',
            name: 'no_mesin'
        }, 
        {
            type: 'string',
            name: 'milik_ke'
        }, 
        {
            type: 'string',
            name: 'warna_plat'
        }, 
        {
            type: 'string',
            name: 'tanggal_akhir_pajak'
        }, 
        {
            type: 'string',
            name: 'tanggal_akhir_stnk'
        }, 
        {
            type: 'string',
            name: 'blokir_ktp'
        }, 
        {
            type: 'string',
            name: 'status_stnk'
        },
        {
            type: 'string',
            name: 'status_rubentina'
        },

        //info etle


        
    ]
});