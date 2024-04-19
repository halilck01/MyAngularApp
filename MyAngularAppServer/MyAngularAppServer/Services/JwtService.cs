﻿using ForcegetTaskServer.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ForcegetTaskServer.Services
{
    public sealed class JwtService
    {
        public string CreateToken(AppUser appUser, bool rememberMe)
        {
            string token = string.Empty;

            List<Claim> claims = new();

            claims.Add(new("UserId", appUser.Id.ToString()));

            claims.Add(new("Username", appUser.UserName ?? string.Empty));

            claims.Add(new("Name", appUser.GetName()));

            DateTime expires = rememberMe ? DateTime.Now.AddMonths(1) : DateTime.Now.AddDays(1);

            JwtSecurityToken jwtSecurityToken = new(
                issuer: "test",
                audience: "test",
                claims: claims,
                notBefore: DateTime.Now,
                expires: expires,
                signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes("my secret key my secret key 1234....my secret key my secret key 1234....my secret key my secret key 1234....")), SecurityAlgorithms.HmacSha512)
                );

            JwtSecurityTokenHandler handler = new();

            token = handler.WriteToken(jwtSecurityToken);

            return token;
        }
    }
}
