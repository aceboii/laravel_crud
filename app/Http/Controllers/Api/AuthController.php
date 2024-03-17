<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;

class AuthController extends Controller
{
    public function login(LoginRequest $request) {
        $credentials = $request -> validated();

        if(!Auth::attempt($credentials)){
            return reponsed([
                'message' => 'provided email or password is correct'
            ], 422);
        }

        /** @var User $user */

        $user = Auth::user();
        $token = $user->createToken('main');
        return response(compact('user', 'token'));
    }

    public function signup(SignupRequest $request){
        $data = $request->validated();
        /** @var \App\Models\User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password'],
        ]);

        $user -> createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }

    public function logout(Request $request){
        /** @var User $user */
        $user = $request-> user();
        $user -> currentAccessToken()->delete();

        return response('', 204);
    }
}
