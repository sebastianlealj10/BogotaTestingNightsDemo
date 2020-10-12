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
    [Route("location")]
    public class CharacterController : ControllerBase
    {
        private readonly ILogger<CharacterController> _logger;

        public CharacterController(ILogger<CharacterController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public IEnumerable<Location> Post([Bind("name, type, dimention")] Location location)
        {
            var restClient = new RestClient("https://rickandmortyapi.com/api/location/");
            var request = new RestRequest($"?name={location.name}&type={location.type}&dimention={location.dimention}", Method.GET);
            var response = restClient.Execute(request);
            try
            {
                var characterObj = JsonConvert.DeserializeObject<LocationResponse>(response.Content);
                if( characterObj.info != null )
                {
                    var restClient2 = new RestClient();
                    var characters = new List<Character>();
                    var charact = "seed";
                    foreach (var loc in characterObj.results)
                    {
                        charact = loc.residents.Length == 0 ? "https://rickandmortyapi.com/api/character/1" : loc.residents[0];
                        var request2 = new RestRequest(charact, Method.GET);
                        var response2 = restClient2.Execute(request2);
                        var characterObj2 = JsonConvert.DeserializeObject<FlatCharacter>(response2.Content);
                        var characterToAdd = new Character
                        {
                            name = characterObj2.name,
                            image = characterObj2.image,
                        };

                        if (characterObj2 != null)
                        {
                            characters.Add(characterToAdd);
                        }
                        else
                        {
                            return new Location[]
                            {
                                new Location{name = "badRequest"}
                            };
                        }
                    }
                    return Enumerable.Range(0,characterObj.results.Length).Select(index => new Location
                    {
                            id = characterObj.results[index].id,
                            name = characterObj.results[index].name,
                            type = characterObj.results[index].type,
                            dimention = characterObj.results[index].dimension,
                            resident = characters[index].name,
                            image = characters[index].image,
                            created = characterObj.results[index].created.ToString()
                    }).ToArray();
                }
                else
                {
                    return new Location[]
                    {
                    new Location{name = "badRequest"}
                    };
                }

            }
            catch (Exception e)
            {
                _logger.LogError(e.ToString());
                return new Location[]
                {
                    new Location{name = "badRequest"}
                };
            }
        }
    }
}
