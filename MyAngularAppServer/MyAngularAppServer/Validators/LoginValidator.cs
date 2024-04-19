using FluentValidation;
using ForcegetTaskServer.DTOs;

namespace ForcegetTaskServer.Validators
{
    public class LoginValidator : AbstractValidator<LoginDto>
    {
        public LoginValidator()
        {
            RuleFor(p => p.UserNameOrEmail).NotEmpty().WithMessage("Please enter a valid username.");
            RuleFor(p => p.UserNameOrEmail).MinimumLength(3).WithMessage("Please enter a valid username.");

            RuleFor(p => p.Password).NotEmpty().WithMessage("Enter a valid password.");
            RuleFor(p => p.Password).Matches("[A-Z]").WithMessage("Your password must contain at least one uppercase letter.");
            RuleFor(p => p.Password).Matches("[a-z]").WithMessage("Your password must contain at least one lowercase letter.");
            RuleFor(p => p.Password).Matches("[0-9]").WithMessage("Your password must contain at least one number.");
            RuleFor(x => x.Password).Matches("[^a-zA-Z0-9]").WithMessage("Your password must contain at least one (!? *.).");
        }
    }
}
