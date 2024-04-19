using FluentValidation.Results;
using ForcegetTaskServer.Abstractions;
using ForcegetTaskServer.DTOs;
using ForcegetTaskServer.Models;
using ForcegetTaskServer.Services;
using ForcegetTaskServer.Validators;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace ForcegetTaskServer.Controllers
{
    public class AuthController(
        UserManager<AppUser> userManager,
        SignInManager<AppUser> signInManager,
        JwtService jwtService) : ApiController
    {
        [HttpPost]
        public async Task<IActionResult> Login(LoginDto request, CancellationToken cancellationToken)
        {
            LoginValidator validator = new();
            ValidationResult validationResult = validator.Validate(request);
            if (!validationResult.IsValid)
            {
                string errors = string.Join("\n", validationResult.Errors.Select(s => s.ErrorMessage));
                return BadRequest(new { Message = errors });
            }

            AppUser? appUser = await userManager.FindByNameAsync(request.UserNameOrEmail);

            if (appUser is null)
            {
                appUser = await userManager.FindByEmailAsync(request.UserNameOrEmail);

                if (appUser is null)
                {
                    return BadRequest(new { Message = "Kullanıcı bulunamadı!!" });
                }
            }

            var result = await signInManager.CheckPasswordSignInAsync(appUser, request.Password, true);

            TimeSpan? timeSpan = appUser.LockoutEnd - DateTime.UtcNow;
            if (result.IsLockedOut && timeSpan is not null)
            {
                return BadRequest(new { Message = $"Kullanıcınız 3 kere şifre girişinden dolayı {Math.Ceiling(timeSpan.Value.TotalMinutes)} dakika kilitlenmiştir!!" });
            }

            if (!result.Succeeded)
            {
                return BadRequest(new { Message = "Şifreniz Yanlış!!" });
            }

            string token = jwtService.CreateToken(appUser, request.RememberMe);

            return Ok(new { AccessToken = token });
        }
    }
}
