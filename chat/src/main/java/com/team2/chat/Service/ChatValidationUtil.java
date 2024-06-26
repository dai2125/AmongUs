package com.team2.chat.Service;

import java.util.Arrays;
import java.util.List;
import java.util.regex.Pattern;

public final class ChatValidationUtil {

    StringBuilder stringBuilder = new StringBuilder();

    static boolean messageContainBadLanguage(String message) {
        for (String badWord : badWords) {
            if (message.contains(badWord)) {
                return true;
            }
        }
        return false;
    }

    static String messageFilterBadLanguage(String message) {
        for (String badWord : badWords) {
            String regex = "\\b" + Pattern.quote(badWord) + "\\b";
            String asterisks = "*".repeat(badWord.length());
            message = message.replaceAll(regex, asterisks);
        }
        return message;
    }

    final static List<String> badWords = Arrays.asList(
            "abortion",
            "abuse",
            "addict",
            "addicts",
            "adult",
            "allah",
            "anal",
            "analannie",
            "analsex",
            "anus",
            "arse",
            "arsehole",
            "ass",
            "assbagger",
            "assblaster",
            "assclown",
            "asscowboy",
            "asses",
            "assfuck",
            "assfucker",
            "asshat",
            "asshole",
            "assholes",
            "asshore",
            "assjockey",
            "asskiss",
            "asskisser",
            "assklown",
            "asslick",
            "asslicker",
            "asslover",
            "assman",
            "assmonkey",
            "assmunch",
            "assmuncher",
            "asspacker",
            "asspirate",
            "asspuppies",
            "assranger",
            "asswhore",
            "asswipe",
            "badfuck",
            "balllicker",
            "balls",
            "ballsack",
            "banging",
            "barf",
            "barface",
            "barfface",
            "bastard ",
            "bazongas",
            "bazooms",
            "beaner",
            "beast",
            "beastality",
            "beastial",
            "beastiality",
            "beatoff",
            "beat-off",
            "beatyourmeat",
            "biatch",
            "bible",
            "bicurious",
            "bigass",
            "bigbastard",
            "bigbutt",
            "bisexual",
            "bi-sexual",
            "bitch",
            "bitcher",
            "bitches",
            "bitchez",
            "bitchin",
            "bitching",
            "bitchslap",
            "bitchy",
            "biteme",
            "blowjob",
            "boang",
            "bogan",
            "bohunk",
            "bollick",
            "bollock",
            "bomd",
            "bondage",
            "boner",
            "bong",
            "boob",
            "boobies",
            "boobs",
            "booby",
            "boody",
            "booty",
            "bootycall",
            "bra",
            "brea5t",
            "breast",
            "breastjob",
            "breastlover",
            "breastman",
            "brothel",
            "bugger",
            "buggered",
            "buggery",
            "bullcrap",
            "bulldike",
            "bulldyke",
            "bullshit",
            "bumblefuck",
            "bumfuck",
            "bunga",
            "bunghole",
            "butchbabes",
            "butchdike",
            "butchdyke",
            "butt",
            "buttbang",
            "butt-bang",
            "buttface",
            "buttfuck",
            "butt-fuck",
            "buttfucker",
            "butt-fucker",
            "buttfuckers",
            "butt-fuckers",
            "butthead",
            "buttman",
            "buttmunch",
            "buttmuncher",
            "buttpirate",
            "buttplug",
            "buttstain",
            "byatch",
            "cameltoe",
            "cancer",
            "carpetmuncher",
            "carruth",
            "chav",
            "cherrypopper",
            "chickslick",
            "chin",
            "chinaman",
            "chinamen",
            "chinese",
            "chink",
            "chinky",
            "choad",
            "chode",
            "cigs",
            "clamdigger",
            "clamdiver",
            "clit",
            "clitoris",
            "clogwog",
            "cocaine",
            "cock",
            "cockblock",
            "cockblocker",
            "cockcowboy",
            "cockfight",
            "cockhead",
            "cockknob",
            "cocklicker",
            "cocklover",
            "cocknob",
            "cockqueen",
            "cockrider",
            "cocksman",
            "cocksmith",
            "cocksmoker",
            "cocksucer",
            "cocksuck ",
            "cocksucked ",
            "cocksucker",
            "cocksucking",
            "cocktail",
            "cocktease",
            "cocky",
            "cohee",
            "coitus",
            "condom",
            "coolie",
            "cooly",
            "coon",
            "coondog",
            "copulate",
            "cornhole",
            "cra5h",
            "crackpipe",
            "crackwhore",
            "crack-whore",
            "crapola",
            "crapper",
            "crotch",
            "crotchjockey",
            "crotchmonkey",
            "crotchrot",
            "cum",
            "cumbubble",
            "cumfest",
            "cumjockey",
            "cumm",
            "cummer",
            "cumming",
            "cumquat",
            "cumqueen",
            "cumshot",
            "cunilingus",
            "cunillingus",
            "cunn",
            "cunnilingus",
            "cunntt",
            "cunt",
            "cunteyed",
            "cuntfuck",
            "cuntfucker",
            "cuntlick ",
            "cuntlicker ",
            "cuntlicking ",
            "cuntsucker",
            "cybersex",
            "cyberslimer",
            "dago",
            "dahmer",
            "darkie",
            "darky",
            "datnigga",
            "deapthroat",
            "deepthroat",
            "defecate",
            "dego",
            "devil",
            "devilworshipper",
            "dick",
            "dickbrain",
            "dickforbrains",
            "dickhead",
            "dickless",
            "dicklick",
            "dicklicker",
            "dickman",
            "dickwad",
            "dickweed",
            "diddle",
            "dike",
            "dildo",
            "dingleberry",
            "dink",
            "dipshit",
            "dipstick",
            "dirty",
            "disease",
            "diseases",
            "disturbed",
            "dix",
            "dixiedike",
            "dixiedyke",
            "doggiestyle",
            "doggystyle",
            "dong",
            "doodoo",
            "doo-doo",
            "doom",
            "dope",
            "dragqueen",
            "dragqween",
            "dripdick",
            "drug",
            "drunk",
            "drunken",
            "dumb",
            "dumbass",
            "dumbbitch",
            "dumbfuck",
            "dyefly",
            "dyke",
            "easyslut",
            "eatballs",
            "eatme",
            "eatpussy",
            "ecstacy",
            "ejaculate",
            "ejaculated",
            "ejaculating ",
            "ejaculation",
            "enema",
            "erect",
            "erection",
            "ero",
            "escort",
            "ethnic",
            "evl",
            "excrement",
            "facefucker",
            "faeces",
            "fag",
            "fagging",
            "faggot",
            "fagot",
            "fannyfucker",
            "fart",
            "farted ",
            "farting ",
            "farty ",
            "fastfuck",
            "fat",
            "fatah",
            "fatass",
            "fatfuck",
            "fatfucker",
            "fatso",
            "fckcum",
            "feces",
            "felatio ",
            "felch",
            "felcher",
            "felching",
            "fellatio",
            "feltch",
            "feltcher",
            "feltching",
            "fetish",
            "fight",
            "fingerfuck ",
            "fingerfucked ",
            "fingerfucker ",
            "fingerfuckers",
            "fingerfucking ",
            "fister",
            "fistfuck",
            "fistfucked ",
            "fistfucker ",
            "fistfucking ",
            "fisting",
            "flange",
            "flasher",
            "flatulence",
            "floo",
            "flydie",
            "flydye",
            "fok",
            "fondle",
            "footaction",
            "footfuck",
            "footfucker",
            "footlicker",
            "footstar",
            "fore",
            "foreskin",
            "forni",
            "fornicate",
            "foursome",
            "fourtwenty",
            "fraud",
            "freakfuck",
            "freakyfucker",
            "freefuck",
            "fu",
            "fubar",
            "fuc",
            "fucck",
            "fuck",
            "fucka",
            "fuckable",
            "fuckbag",
            "fuckbuddy",
            "fucked",
            "fuckedup",
            "fucker",
            "fuckers",
            "fuckface",
            "fuckfest",
            "fuckfreak",
            "fuckfriend",
            "fuckhead",
            "fuckher",
            "fuckin",
            "fuckina",
            "fucking",
            "fuckingbitch",
            "fuckinnuts",
            "fuckinright",
            "fuckit",
            "fuckknob",
            "fuckme ",
            "fuckmehard",
            "fuckmonkey",
            "fuckoff",
            "fuckpig",
            "fucks",
            "fucktard",
            "fuckwhore",
            "fuckyou",
            "fudgepacker",
            "fugly",
            "fuk",
            "fuks",
            "funeral",
            "funfuck",
            "fungus",
            "fuuck",
            "gangbang",
            "gangbanged ",
            "gangbanger",
            "gangsta",
            "gatorbait",
            "gay",
            "gaymuthafuckinwhore",
            "gaysex ",
            "geni",
            "genital",
            "getiton",
            "gin",
            "ginzo",
            "gipp",
            "givehead",
            "glazeddonut",
            "gob",
            "godammit",
            "goddamit",
            "goddammit",
            "goddamn",
            "goddamned",
            "goddamnes",
            "goddamnit",
            "goddamnmuthafucker",
            "goldenshower",
            "gonorrehea",
            "gonzagas",
            "gook",
            "gotohell",
            "goy",
            "goyim",
            "greaseball",
            "gringo",
            "groe",
            "gross",
            "grostulation",
            "gubba",
            "gummer",
            "gun",
            "gyp",
            "gypo",
            "gypp",
            "gyppie",
            "gyppo",
            "gyppy",
            "hamas",
            "handjob",
            "hapa",
            "harder",
            "hardon",
            "harem",
            "headfuck",
            "headlights",
            "hebe",
            "heeb",
            "henhouse",
            "heroin",
            "herpes",
            "heterosexual",
            "hillbillies",
            "hindoo",
            "hiscock",
            "hitler",
            "hitlerism",
            "hitlerist",
            "hiv",
            "ho",
            "hobo",
            "hodgie",
            "hoes",
            "holestuffer",
            "homicide",
            "homo",
            "homobangers",
            "homosexual",
            "honger",
            "honk",
            "honkers",
            "honkey",
            "honky",
            "hook",
            "hooker",
            "hookers",
            "hooters",
            "hore",
            "hork",
            "horney",
            "horniest",
            "horny",
            "horseshit",
            "hosejob",
            "hoser",
            "hostage",
            "hotdamn",
            "hotpussy",
            "hottotrot",
            "hummer",
            "hussy",
            "hustler",
            "hymen",
            "hymie",
            "iblowu",
            "idiot",
            "ikey",
            "illegal",
            "incest",
            "insest",
            "intercourse",
            "interracial",
            "intheass",
            "inthebuff",
            "israel",
            "itch",
            "jackass",
            "jackoff",
            "jackshit",
            "jacktheripper",
            "jade",
            "jap",
            "japcrap",
            "jebus",
            "jeez",
            "jerkoff",
            "jiga",
            "jigaboo",
            "jigg",
            "jigga",
            "jiggabo",
            "jigger ",
            "jiggy",
            "jihad",
            "jijjiboo",
            "jimfish",
            "jism",
            "jiz ",
            "jizim",
            "jizjuice",
            "jizm ",
            "jizz",
            "jizzim",
            "jizzum",
            "joint",
            "juggalo",
            "jugs",
            "junglebunny",
            "kaffer",
            "kaffir",
            "kaffre",
            "kafir",
            "kanake",
            "kid",
            "kigger",
            "kike",
            "kink",
            "kinky",
            "kissass",
            "kkk",
            "knockers",
            "kock",
            "kondum",
            "koon",
            "kotex",
            "krap",
            "krappy",
            "kraut",
            "kum",
            "kumbubble",
            "kumbullbe",
            "kummer",
            "kumming",
            "kumquat",
            "kums",
            "kunilingus",
            "kunnilingus",
            "kunt",
            "ky",
            "kyke",
            "lactate",
            "laid",
            "lapdance",
            "latin",
            "lesbain",
            "lesbayn",
            "lesbian",
            "lesbin",
            "lesbo",
            "lez",
            "lezbe",
            "lezbefriends",
            "lezbo",
            "lezz",
            "lezzo",
            "liberal",
            "libido",
            "licker",
            "lickme",
            "limey",
            "limpdick",
            "limy",
            "lingerie",
            "liquor",
            "livesex",
            "loadedgun",
            "lolita",
            "looser",
            "loser",
            "lotion",
            "lovebone",
            "lovegoo",
            "lovegun",
            "lovejuice",
            "lovemuscle",
            "lovepistol",
            "loverocket",
            "lowlife",
            "lsd",
            "lubejob",
            "lucifer",
            "luckycammeltoe",
            "lugan",
            "lynch",
            "macaca",
            "mafia",
            "magicwand",
            "mams",
            "manhater",
            "manpaste",
            "marijuana",
            "mastabate",
            "mastabater",
            "masterbate",
            "masterblaster",
            "mastrabator",
            "masturbate",
            "masturbating",
            "mattressprincess",
            "meatbeatter",
            "meatrack",
            "meth",
            "mgger",
            "mggor",
            "mickeyfinn",
            "milf",
            "minority",
            "mockey",
            "mockie",
            "mocky",
            "mofo",
            "moky",
            "moles",
            "molest",
            "molestation",
            "molester",
            "molestor",
            "moneyshot",
            "mooncricket",
            "mormon",
            "moron",
            "moslem",
            "mosshead",
            "mothafuck",
            "mothafucka",
            "mothafuckaz",
            "mothafucked ",
            "mothafucker",
            "mothafuckin",
            "mothafucking ",
            "mothafuckings",
            "motherfuck",
            "motherfucked",
            "motherfucker",
            "motherfuckin",
            "motherfucking",
            "motherfuckings",
            "motherlovebone",
            "muff",
            "muffdive",
            "muffdiver",
            "muffindiver",
            "mufflikcer",
            "mulatto",
            "muncher",
            "munt",
            "muslim",
            "naked",
            "narcotic",
            "nasty",
            "nastybitch",
            "nastyho",
            "nastyslut",
            "nastywhore",
            "nazi",
            "necro",
            "negro",
            "negroes",
            "negroid",
            "negro's",
            "nig",
            "niger",
            "nigerian",
            "nigerians",
            "nigg",
            "nigga",
            "niggah",
            "niggaracci",
            "niggard",
            "niggarded",
            "niggarding",
            "niggardliness",
            "niggardliness's",
            "niggardly",
            "niggards",
            "niggard's",
            "niggaz",
            "nigger",
            "niggerhead",
            "niggerhole",
            "niggers",
            "nigger's",
            "niggle",
            "niggled",
            "niggles",
            "niggling",
            "nigglings",
            "niggor",
            "niggur",
            "niglet",
            "nignog",
            "nigr",
            "nigra",
            "nigre",
            "nip",
            "nipple",
            "nipplering",
            "nittit",
            "nlgger",
            "nlggor",
            "nofuckingway",
            "nook",
            "nookey",
            "nookie",
            "noonan",
            "nooner",
            "nude",
            "nudger",
            "nutfucker",
            "nymph",
            "ontherag",
            "oral",
            "orga",
            "orgasim ",
            "orgasm",
            "orgies",
            "orgy",
            "osama",
            "paki",
            "palesimian",
            "palestinian",
            "pansies",
            "pansy",
            "panti",
            "panties",
            "payo",
            "pearlnecklace",
            "peck",
            "pecker",
            "peckerwood",
            "pee",
            "peehole",
            "pee-pee",
            "peepshow",
            "peepshpw",
            "pendy",
            "penetration",
            "peni5",
            "penile",
            "penis",
            "penises",
            "penthouse",
            "period",
            "perv",
            "phonesex",
            "phuk",
            "phuked",
            "phuking",
            "phukked",
            "phukking",
            "phungky",
            "phuq",
            "pi55",
            "picaninny",
            "piccaninny",
            "pickaninny",
            "piker",
            "pikey",
            "piky",
            "pimp",
            "pimped",
            "pimper",
            "pimpjuic",
            "pimpjuice",
            "pimpsimp",
            "pindick",
            "piss",
            "pissed",
            "pisser",
            "pisses ",
            "pisshead",
            "pissin ",
            "pissing",
            "pissoff ",
            "pistol",
            "pixie",
            "pixy",
            "playboy",
            "playgirl",
            "pocha",
            "pocho",
            "pocketpool",
            "pohm",
            "polack",
            "pom",
            "pommie",
            "pommy",
            "poo",
            "poon",
            "poontang",
            "poop",
            "pooper",
            "pooperscooper",
            "pooping",
            "poorwhitetrash",
            "popimp",
            "porchmonkey",
            "porn",
            "pornflick",
            "pornking",
            "porno",
            "pornography",
            "pornprincess",
            "pot",
            "poverty",
            "premature",
            "pric",
            "prick",
            "prickhead",
            "primetime",
            "propaganda",
            "pros",
            "prostitute",
            "protestant",
            "pu55i",
            "pu55y",
            "pube",
            "pubic",
            "pubiclice",
            "pud",
            "pudboy",
            "pudd",
            "puddboy",
            "puke",
            "puntang",
            "purinapricness",
            "puss",
            "pussie",
            "pussies",
            "pussy",
            "pussycat",
            "pussyeater",
            "pussyfucker",
            "pussylicker",
            "pussylips",
            "pussylover",
            "pussypounder",
            "pusy",
            "quashie",
            "queef",
            "queer",
            "quickie",
            "quim",
            "ra8s",
            "rabbi",
            "racial",
            "racist",
            "radical",
            "radicals",
            "raghead",
            "rape",
            "raped",
            "raper",
            "rapist",
            "rearend",
            "rearentry",
            "rectum",
            "redlight",
            "redneck",
            "reefer",
            "reestie",
            "refugee",
            "rentafuck",
            "republican",
            "rere",
            "retard",
            "retarded",
            "ribbed",
            "rigger",
            "rimjob",
            "rimming",
            "roach",
            "robber",
            "roundeye",
            "rump",
            "russki",
            "russkie",
            "sadis",
            "sadom",
            "samckdaddy",
            "sandm",
            "sandnigger",
            "satan",
            "scag",
            "scallywag",
            "scat",
            "schlong",
            "screw",
            "screwyou",
            "scrotum",
            "scum",
            "semen",
            "seppo",
            "servant",
            "sex",
            "sexed",
            "sexfarm",
            "sexhound",
            "sexhouse",
            "sexing",
            "sexkitten",
            "sexpot",
            "sexslave",
            "sextogo",
            "sextoy",
            "sextoys",
            "sexual",
            "sexually",
            "sexwhore",
            "sexy",
            "sexymoma",
            "sexy-slim",
            "shag",
            "shaggin",
            "shagging",
            "shat",
            "shav",
            "shawtypimp",
            "sheeney",
            "shhit",
            "shinola",
            "shit",
            "shitcan",
            "shitdick",
            "shite",
            "shiteater",
            "shited",
            "shitface",
            "shitfaced",
            "shitfit",
            "shitforbrains",
            "shitfuck",
            "shitfucker",
            "shitfull",
            "shithapens",
            "shithappens",
            "shithead",
            "shithouse",
            "shiting",
            "shitlist",
            "shitola",
            "shitoutofluck",
            "shits",
            "shitstain",
            "shitted",
            "shitter",
            "shitting",
            "shitty ",
            "shortfuck",
            "sixsixsix",
            "sixtynine",
            "sixtyniner",
            "skank",
            "skankbitch",
            "skankfuck",
            "skankwhore",
            "skanky",
            "skankybitch",
            "skankywhore",
            "skinflute",
            "skum",
            "skumbag",
            "slant",
            "slanteye",
            "slapper",
            "slav",
            "slave",
            "slavedriver",
            "sleezebag",
            "sleezeball",
            "slideitin",
            "slime",
            "slimeball",
            "slimebucket",
            "slopehead",
            "slopey",
            "slopy",
            "slut",
            "sluts",
            "slutt",
            "slutting",
            "slutty",
            "slutwear",
            "slutwhore",
            "smack",
            "smackthemonkey",
            "smut",
            "snatch",
            "snatchpatch",
            "snigger",
            "sniggered",
            "sniggering",
            "sniggers",
            "snigger's",
            "sniper",
            "snot",
            "snowback",
            "snownigger",
            "sob",
            "sodom",
            "sodomise",
            "sodomite",
            "sodomize",
            "sodomy",
            "sonofabitch",
            "sonofbitch",
            "sooty",
            "sos",
            "soviet",
            "spaghettibender",
            "spaghettinigger",
            "spank",
            "spankthemonkey",
            "sperm",
            "spermacide",
            "spermbag",
            "spermhearder",
            "spermherder",
            "spic",
            "spick",
            "spig",
            "spigotty",
            "spik",
            "spit",
            "spitter",
            "splittail",
            "spooge",
            "spreadeagle",
            "spunk",
            "spunky",
            "squaw",
            "stagg",
            "stiffy",
            "strapon",
            "stringer",
            "stripclub",
            "stroke",
            "stroking",
            "stupid",
            "stupidfuck",
            "stupidfucker",
            "suck",
            "suckdick",
            "sucker",
            "suckme",
            "suckmyass",
            "suckmydick",
            "suckmytit",
            "suckoff",
            "suicide",
            "swallow",
            "swallower",
            "swalow",
            "swastika",
            "sweetness",
            "syphilis",
            "taboo",
            "taff",
            "tampon",
            "tang",
            "tantra",
            "tarbaby",
            "tard",
            "teat",
            "terror",
            "terrorist",
            "teste",
            "testicle",
            "testicles",
            "thicklips",
            "thirdeye",
            "thirdleg",
            "threesome",
            "threeway",
            "timbernigger",
            "tinkle",
            "tit",
            "titbitnipply",
            "titfuck",
            "titfucker",
            "titfuckin",
            "titjob",
            "titlicker",
            "titlover",
            "tits",
            "tittie",
            "titties",
            "titty",
            "tnt",
            "toilet",
            "tongethruster",
            "tonguethrust",
            "tonguetramp",
            "tortur",
            "torture",
            "tosser",
            "towelhead",
            "trailertrash",
            "tramp",
            "trannie",
            "tranny",
            "transexual",
            "transsexual",
            "transvestite",
            "triplex",
            "trisexual",
            "trojan",
            "trots",
            "tuckahoe",
            "tunneloflove",
            "turd",
            "turnon",
            "twat",
            "twink",
            "twinkie",
            "twobitwhore",
            "uck",
            "uk",
            "unfuckable",
            "upskirt",
            "uptheass",
            "upthebutt",
            "urinary",
            "urinate",
            "urine",
            "usama",
            "uterus",
            "vagina",
            "vaginal",
            "vatican",
            "vibr",
            "vibrater",
            "vibrator",
            "vietcong",
            "violence",
            "virgin",
            "virginbreaker",
            "vomit",
            "vulva",
            "wab",
            "wank",
            "wanker",
            "wanking",
            "waysted",
            "weenie",
            "weewee",
            "welfare",
            "wetb",
            "wetback",
            "wetspot",
            "whacker",
            "whash",
            "whigger",
            "whiskey",
            "whiskeydick",
            "whiskydick",
            "whit",
            "whitenigger",
            "whites",
            "whitetrash",
            "whitey",
            "whiz",
            "whop",
            "whore",
            "whorefucker",
            "whorehouse",
            "wigger",
            "willie",
            "williewanker",
            "willy",
            "wn",
            "wog",
            "wop",
            "wtf",
            "wuss",
            "wuzzie",
            "xtc",
            "xxx",
            "yankee",
            "yellowman",
            "zigabo",
            "zipperhead");
}

