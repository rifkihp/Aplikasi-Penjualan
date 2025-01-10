<?php

namespace App\Controllers;

use CodeIgniter\API\ResponseTrait;

class Auth extends \CodeIgniter\Controller
{
    use ResponseTrait;

    public function Register() {

		$date = new \DateTime("now", new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'nama'                => $this->request->getPost('nama'),

            'province'            => $this->request->getPost('province'),
            'city'                => $this->request->getPost('city'),
            'subdistrict'         => $this->request->getPost('subdistrict'),

            'nohp'                => $this->request->getPost('nohp'),
            'email'               => $this->request->getPost('email'),
            'username'            => $this->request->getPost('username'),
			
            'password'            => $this->request->getPost('password'),			
            'konfirmasi_password' => $this->request->getPost('konfirmasi_password'),
            'photo'               => 'default.png',
            'aktif'               => 1,
            
            'user_create'         => 0,
            'date_create'         => $date->format('Y-m-d H:i:s'),
			'user_update'         => 0,
			'date_update'         => $date->format('Y-m-d H:i:s')
		];

        $validation = \Config\Services::validation();
		if($validation->run($_DATA, 'registrasi') == FALSE) {
            foreach($validation->getErrors() as $value) {
                $response = [                
                    'success' => false,
                    'message' => $value
                ];
    
                return $this->respond($response, 500);
            }
        }

        if($_DATA['password']!=$_DATA['konfirmasi_password']) {
            $response = [                
                'success' => false,
                'message' => 'Konfirmasi password tidak sesuai.'
            ];

            return $this->respond($response, 500);
        }

        $model = new \App\Models\User();

        //CHECK DUPLIKAT NO HP;
		$builder = $model->select('COUNT(*) TOTAL');
		$builder->where('nohp', $_DATA['nohp']);
		$check = $builder->get()->getRowArray();
		if($check['TOTAL']>0) {
			$response = [
				'success' => false,
				'message' => 'No. HP sudah terpakai.'
			];

			return $this->respond($response, 500);
		}

        //CHECK DUPLIKAT EMAIL;
		$builder = $model->select('COUNT(*) TOTAL');
		$builder->where('email', $_DATA['email']);
		$check = $builder->get()->getRowArray();
		if($check['TOTAL']>0) {
			$response = [
				'success' => false,
				'message' => 'Email sudah terpakai.'
			];

			return $this->respond($response, 500);
		}

        //CHECK DUPLIKAT USER ID;
		$builder = $model->select('COUNT(*) TOTAL');
		$builder->where('username', $_DATA['username']);
		$check = $builder->get()->getRowArray();
		if($check['TOTAL']>0) {
			$response = [
				'success' => false,
				'message' => 'User ID sudah terpakai.'
			];

			return $this->respond($response, 500);
		}

        $MCrypt = new \App\Libraries\MCrypt();
		$_DATA['password'] = $MCrypt->encrypt($_DATA['password']);  
        
		$insert = $model->insert($_DATA);
		if($insert) {
			$response = [
				'success' => true,
				'message' => 'Proses registrasi berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Tambah data Kelas gagal.'
			];

			return $this->respond($response, 500);
		}
	}

    public function Login() {
		
        $_DATA = [
            'username' => $this->request->getPost('userid'),
            'password' =>  $this->request->getPost('password')
        ];

        $validation = \Config\Services::validation();
		if($validation->run($_DATA, 'auth') == FALSE) {
            foreach($validation->getErrors() as $value) {
                $response = [                
                    'success' => false,
                    'message' => $value
                ];
    
                return $this->respond($response, 500);
            }
        }

        $MCrypt = new \App\Libraries\MCrypt();
		$_DATA['password'] = $MCrypt->encrypt($_DATA['password']);  

        $model = new \App\Models\User();

        $builder = $model->db->table('user A');
        $builder->select('
            A.id,
            A.nama,

            B.province,
            C.city_name city,
            D.subdistrict_name subdistrict,

            A.nohp,
            A.email,
            A.username,
            
            A.photo,
            A.aktif,
            
            A.tipe_user,
            A.id_tipe_user
        ');
        
        $builder->join('province B', 'B.province_id=A.province', 'LEFT');
        $builder->join('city C', 'C.city_id=A.city', 'LEFT');
        $builder->join('subdistrict D', 'D.subdistrict_id=A.subdistrict', 'LEFT');
        $builder->where($_DATA);

        $user = $builder->get()->getRowArray();
		if($user) {
            if($user['aktif']==0) {
                $response = [                
                    'success' => false,
                    'message' => 'User tidak aktif.'
                ];
    
                return $this->respond($response, 500);
            } 
            
            $mdl_menu = new \App\Models\Menu();
            $menu = $mdl_menu->getMenu($user['id'], 0, 0, 'menu');
			$response = [
                'success' => true,
                'data' => [
                    $user
                ],
                'menu' => [
                    'children' => $menu,
                ]
            ];

            $session = \Config\Services::session();
            $session->set(['user' => $user, 'menu' => $menu]);

			return $this->respond($response, 200);
		} else {
			$response = [
                'success' => false,
                'message' => 'User ID dan password tidak sesuai.'
            ];

            return $this->respond($response, 500);	
		}
    }

    public function Logout() {
		$session = \Config\Services::session();
		$session->destroy();

		$response = [
            'status' => 200,
            'success' => true,
            'data' => [
                'message' => 'Proses logout berhasil.'
            ],
        ];

        return $this->respond($response, 200);	
	}

}