using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using RestSharp;

namespace BogotaTestingNights.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CharacterController : ControllerBase
    {
        private readonly ILogger<CharacterController> _logger;

        public CharacterController(ILogger<CharacterController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public IEnumerable<Character> Post([Bind("name, status, species, type, gender")] Character character)
        {
            var restClient = new RestClient("https://rickandmortyapi.com/api/character/");
            var request = new RestRequest($"?name={character.name}&status={character.status}&species={character.species}&type={character.type}&gender={character.gender}", Method.GET);
            var response = restClient.Execute(request);
            try
            {
                var characterObj = JsonConvert.DeserializeObject<CharacterResponse>(response.Content);
                if( characterObj.info != null )
                { 
                    return Enumerable.Range(0,characterObj.results.Length).Select(index => new Character
                    {
                        id = characterObj.results[index].id,
                        name = characterObj.results[index].name,
                        status = characterObj.results[index].status,
                        species = characterObj.results[index].species,
                        type = characterObj.results[index].type,
                        gender = characterObj.results[index].gender,
                        location = characterObj.results[index].location.name,
                        image = characterObj.results[index].image,
                        episode = characterObj.results[index].episode[0].LastIndexOf("/") + 1,
                        created = characterObj.results[index].created.ToString()
                    }).ToArray();
                }
                else
                {
                    return new Character[]
                    {
                    new Character{name = "badRequest"}
                    };
                }

            }
            catch (Exception e)
            {
                _logger.LogError(e.ToString());
                return new Character[]
                {
                    new Character{name = "badRequest"}
                };
            }
        }
    }
}
