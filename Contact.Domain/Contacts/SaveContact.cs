using System;
using CommandR;
using CommandR.Authentication;
using CommandR.Extensions;
using CommandR.Services;
using MediatR;

namespace Contact.Domain
{
    /// <summary>
    /// Retrieve a User by id, or create a new unsaved one for binding.
    /// CommandR provides CopyTo method. Similar to AutoMapper, but supports
    ///   CommandR's extension to JsonRpc, IPatchable which automatically maps
    ///   which properties were actually included by the caller (eg only Username).
    /// </summary>
    [Authorize]
    public class SaveContact : ICommand, IPatchable, IRequest<int>
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string[] PatchFields { get; set; }

        internal class Handler : IRequestHandler<SaveContact, int>
        {
            private readonly ContactDb _db;

            public Handler(ContactDb db)
            {
                _db = db;
            }

            public int Handle(SaveContact cmd)
            {
                if (string.IsNullOrWhiteSpace(cmd.Email))
                    throw new ApplicationException("Invalid email: " + cmd.Email);

                if (string.IsNullOrWhiteSpace(cmd.PhoneNumber))
                    throw new ApplicationException("Invalid phone: " + cmd.PhoneNumber);

                var contact = _db.Contacts.Find(cmd.Id)
                              ?? new Contact();

                cmd.CopyTo(contact, cmd.PatchFields);
                if (contact.Id == 0) _db.Contacts.Add(contact);
                _db.SaveChanges();

                return contact.Id;
            }
        };
    };
}
