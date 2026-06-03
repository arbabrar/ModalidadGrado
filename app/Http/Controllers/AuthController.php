<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use App\Models\User;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function register(RegisterRequest $request){
        $user=User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>bcrypt($request->password)
        ]);
        $token= JWTAuth::fromUser($user);

        return response()->json(compact('user','token'),201);
    }
    public function login(LoginRequest $request){
        $credentials = $request->only('email','password');

        if(!$token = JWTAuth::attempt($credentials)){
            return response()->json(["error"=>'invalid_credentials'],401);
        }

        $user =User::where('email',$request->email)->first();
        //dd($user);
        return response()->json(compact('user','token'),200);


    }
}
