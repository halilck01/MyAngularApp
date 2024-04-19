﻿namespace ForcegetTaskServer.Models
{
    public abstract class BaseEntity
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}
