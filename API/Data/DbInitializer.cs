using API.Entities;
using System.Collections.Generic;
using System.Linq;

namespace API.Data
{
    public static class DbInitializer
    {
        public static void Initialize(StoreContext context)
        {
            if (context.Medicines.Any())
                return;
            var medicines = new List<Medicine>
            {
                new Medicine
                {
                   
                    Name = "Crocin",
                    Description =
                        "Crocin Pain Relief Tablet is a combination of two medicines: Caffeine and Paracetamol. Caffeine narrows the blood vessels in the brain to reduce headache. Paracetamol is an analgesic (pain reliever) which works by blocking the release of certain chemical messengers that cause pain. Together, they relieve headache effectively.",
                    Price = 80,
                    PictureUrl = "/images/medicines/img1.png",
                    Brand = "GSK",
                    Category = "Fever-Headache",
                    QuantityStock = 100
                },
                new Medicine
                {
                    
                    Name = "Dolo 650",
                    Description = "Dolo 650 Tablet helps relieve pain and fever by blocking the release of certain chemical messengers responsible for fever and pain. It is used to treat headaches, migraine, nerve pain, toothache, sore throat, period (menstrual) pains, arthritis, muscle aches, and the common cold.",
                    Price = 50,
                    PictureUrl = "/images/medicines/img2.png",
                    Brand = "Microlabs",
                    Category = "Fever-Headache",
                    QuantityStock = 100
                },
                new Medicine
                {
                    
                    Name = "Saridon",
                    Description =
                        "Saridon is an effective remedy for headaches. Just one tablet of Saridon is enough to provide relief from various types of headaches. It is effective for different headache types of headache such as a headache that spreads across, on the sides and back of the head.",
                    Price = 65,
                    PictureUrl = "/images/medicines/img3.png",
                    Brand = "Bayer",
                    Category = "Fever-Headache",
                    QuantityStock = 100
                },
                new Medicine
                {
                    
                    Name = "Otrivin Oxy Fast Relief ",
                    Description =
                        "Otrivin Oxy Fast Relief Adult Nasal Spray helps in providing effective relief from the blocked nose. It is a fast acting formula which starts to unblock the nose in 25 seconds. It helps in reducing excess nasal secretions and relives the swollen blood vessels. Otrivin Oxy Fast Relief provides a long lasting relief and acts upto 12 hours.",
                    Price = 90,
                    PictureUrl = "/images/medicines/img4.png",
                    Brand = "GSK",
                    Category = "Cold&Cough",
                    QuantityStock = 100
                },
                new Medicine
                {
                    
                    Name = "Dabur Honitus Herbal Cough Remedy",
                    Description =
                        "It is used to treat cough and relieve nasal congestion. It also provides effective relief from dry cough as well as throat irritation. The syrup is particularly effective against acute non-productive cough and unlike commonly available cough syrups, it does not cause drowsiness. It works as a natural cough remedy that has both antimicrobial as well as anti-inflammatory properties.",
                    Price = 110,
                    PictureUrl = "/images/medicines/img5.png",
                    Brand = "Dabur",
                    Category = "Cold&Cough",
                    QuantityStock = 100
                },
                new Medicine
                {
                    
                    Name = "Vicks Inhaler",
                    Description =
                        "Vicks Inhaler opens up the blocked stuffed nose due to cold and nasal allergies.",
                    Price = 45,
                    PictureUrl = "/images/medicines/img6.png",
                    Brand = "AbcPharma",
                    Category = "Cold&Cough",
                    QuantityStock = 100
                },
                new Medicine
                {
                    
                    Name = "Himalaya Koflet Lozenges",
                    Description =
                        "Koflet lozenge is beneficial in both productive and dry cough. Lozenges reduces the bronchial mucosal irritation and inflammation in the upper respiratory tract, especially in the pharynx and larynx. In addition, the anti-allergic, antimicrobial and immune-resistance building properties provide relief from cough of varied etiology.",
                    Price = 30,
                    PictureUrl = "/images/medicines/img7.png",
                    Brand = "Himalaya",
                    Category = "Cold&Cough",
                    QuantityStock = 100
                },
                new Medicine
                {
                    
                    Name = "HealthKart HK Vitals Vitamin D3 2000IU Softgel Capsule",
                    Description =
                        "Healthkart Vitamin D3 Capsule is a highly absorbable form of vitamin D3 for building and maintaining stronger and healthier bones.  Vitamin D3 is essential for calcium absorption that helps support strong bones and teeth. ",
                    Price = 400,
                    PictureUrl = "/images/medicines/img8.png",
                    Brand = "Healthkart",
                    Category = "Vitamins",
                    QuantityStock = 100
                },
                new Medicine
                {
                    
                    Name = "Dr. Morepen Omega 3 Triple Strength 1250mg Deep Sea Fish Oil",
                    Description =
                        "Dr. Morepen brings you the richness of omega-3 derived from nature backed by science in the form of Omega-3 Deep Sea Fish Oil (Triple Strength). This is produced from ultrapure micro-filtered deep-sea Peruvian anchovy fish. It has been designed to provide a rich dose of 1250mg Fish Oil which is three times more effective than regular fish oil. ",
                    Price = 500,
                    PictureUrl = "/images/medicines/img9.png",
                    Brand = "Morepen",
                    Category = "Vitamins",
                    QuantityStock = 100
                },
                new Medicine
                {
                    
                    Name = "Neurobion Forte Tablet",
                    Description =
                        "Neurobion Forte, vitamin B12 B1 B6 supplement, which helps provide relief from tingling, numbness and burning sensation, 30 Tablets.",
                    Price = 43,
                    PictureUrl = "/images/medicines/img10.png",
                    Brand = "AbcPharma",
                    Category = "Vitamins",
                    QuantityStock = 100
                },
                new Medicine
                {
                   
                    Name = "Seacod Cod Liver Oil Capsule",
                    Description =
                        "It is an Omega 3 supplement with added vitamin A and D, which can be elemental in developing an active, healthy lifestyle throughout the year. This cod in liver oil for women, men, and kids is an ideal way to meet the required nutritional gaps. Here are some science-backed facts to support the importance of cod liver oil in the diet.",
                    Price = 295,
                    PictureUrl = "/images/medicines/img11.png",
                    Brand = "Nutriscience",
                    Category = "Vitamins",
                    QuantityStock = 100
                },
                new Medicine
                {
                    
                    Name = "Becadexamin Soft Gelatin Capsule",
                    Description =
                        "It contains 11 vitamins (B-complex vitamins, Vitamin A, Vitamin C, Vitamin E, and Vitamin D3), 6 minerals (calcium, magnesium, copper, potassium, zinc, and manganese). These vitamins and minerals act as natural antioxidants that are anti-inflammatory in nature. ",
                    Price = 60,
                    PictureUrl = "/images/medicines/img12.png",
                    Brand = "GSK",
                    Category = "Vitamins",
                    QuantityStock = 100
                },
                new Medicine
                {
                    
                    Name = "MuscleBlaze MB Beginner's Whey Protein Concentrate Powder Chocolate",
                    Description =
                        "MuscleBlaze MB Beginner's Whey Protein Concentrate Powder .Committing to a fitness routine is just as important as the nutrition you feed your body. After a rigorous workout, it is mandatory to replenish lost nutrients. Check out MuscleBlaze Beginners Whey Protein Supplement formulated keeping in mind the challenges faced by beginners in digesting protein.",
                    Price = 2670,
                    PictureUrl = "/images/medicines/img13.png",
                    Brand = "Healthkart",
                    Category = "Protein",
                    QuantityStock = 100
                },
                new Medicine
                {
                    
                    Name = "AS-IT-IS Nutrition Whey Protein Concentrate",
                    Description =
                        "AS-IT-IS Nutrition Whey Protein Concentrate is an unflavoured, undenatured protein supplement which helps in muscle building and gains lean mass. It is an excellent source of pure protein for bodybuilders. The protein supplement contains whey protein concentrate 80% powder.",
                    Price = 1700,
                    PictureUrl = "/images/medicines/img14.png",
                    Brand = "Medizen",
                    Category = "Protein",
                    QuantityStock = 100
                },
                new Medicine
                {
                    
                    Name = "Nutrabay Creatine Monohydrate Unflavoured",
                    Description =
                        "Nutrabay Pure Creatine Monohydrate contains 3g of fast absorbing micronized creatine in each serving for rapid absorption rate with faster results in building strength and endurance.",
                    Price = 950,
                    PictureUrl = "/images/medicines/img15.png",
                    Brand = "Morepen",
                    Category = "Protein",
                    QuantityStock = 100
                },
                new Medicine
                {
                   
                    Name = "Burnol Cream",
                    Description =
                        "It contains aminacrine HCL and cetrimide as active ingredients which are known to have antimicrobial and antiseptic properties. Aminacrine HCL works as an antimicrobial agent that is applied topically. It helps in the prevention and treatment of infections during the treatment of burns.",
                    Price = 45,
                    PictureUrl = "/images/medicines/img16.png",
                    Brand = "Morepen",
                    Category = "Firstaid",
                    QuantityStock = 100
                },
                new Medicine
                {
                    
                    Name = "Dettol Antiseptic Disinfectant Liquid",
                    Description = "It is used to prevent infections caused by bacteria, fungus, and viruses. It is also used as a first-aid for cleaning wounds and scrapes, thereby lowering the risk of infections. It is dermatologically tested and recommended by the Indian Medical Association for surface cleaning and personal hygiene liquid.",
                    Price = 220,
                    PictureUrl = "/images/medicines/img17.png",
                    Brand = "GSK",
                    Category = "Firstaid",
                    QuantityStock = 100
                },
                new Medicine
                {
                    
                    Name = "Hansaplast Cotton Crepe Bandage B.P. 6cm x 4m",
                    Description =
                        "Hansaplast Cotton Crepe Bandage provides optimum support to the injured area and helps in relieving pain. The material of the bandage is soft and skin-friendly. Its discreet flesh coloured material blends well with the skin. ",
                    Price = 170,
                    PictureUrl = "/images/medicines/img18.png",
                    Brand = "Bayer",
                    Category = "Firstaid",
                    QuantityStock = 100
                },
            };

            foreach (var medicine in medicines)
            {
                context.Medicines.Add(medicine);
            }

            context.SaveChanges();
        }
    }
}
