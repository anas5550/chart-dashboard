import { useState, useEffect } from 'react';
import api from '../utils/services/api'; // Assuming your api.js is in utils/services
import { heatmapMetrics } from '../utils/constants/heatmapMetrics'; // Import heatmapMetrics
import { daysOfWeek } from '../utils/constants/daysOfWeek'; // Import daysOfWeek

const MOCK_HEATMAP_DATA = [
  {
    weekNumber: 1,
    weekday: 'Sunday',
    Total_CPC: 3.806077859001013,
    Total_CR_perc: 5.716413643150363,
    Total_ROAS: 11.161684085474342,
    Hourly_Data: [
      {
        time_part: '00:00:00',
        show: 0,
        CPC: 4.914583164710643,
        CR_perc: 5.1902063941723995,
        ROAS: 7.863138677866772,
      },
      {
        time_part: '01:00:00',
        show: 0,
        CPC: 4.73653888800887,
        CR_perc: 4.910502138444479,
        ROAS: 7.899170182902217,
      },
      {
        time_part: '02:00:00',
        show: 0,
        CPC: 4.884038406420178,
        CR_perc: 4.069934078532531,
        ROAS: 6.781564528083538,
      },
      {
        time_part: '03:00:00',
        show: 0,
        CPC: 5.067751389590702,
        CR_perc: 4.345629105608893,
        ROAS: 6.937876654688167,
      },
      {
        time_part: '04:00:00',
        show: 0,
        CPC: 4.793673870333988,
        CR_perc: 4.9770792403405375,
        ROAS: 7.102182531550806,
      },
      {
        time_part: '05:00:00',
        show: 0,
        CPC: 4.5368610054921845,
        CR_perc: 3.760033798056612,
        ROAS: 6.497668723082295,
      },
      {
        time_part: '06:00:00',
        show: 0,
        CPC: 4.56238016868957,
        CR_perc: 4.525817732976754,
        ROAS: 7.477221519064394,
      },
      {
        time_part: '07:00:00',
        show: 0,
        CPC: 4.437763664757939,
        CR_perc: 4.778761061946903,
        ROAS: 7.6788215852209705,
      },
      {
        time_part: '08:00:00',
        show: 0,
        CPC: 4.266474373197249,
        CR_perc: 5.30286221433326,
        ROAS: 9.483110059458804,
      },
      {
        time_part: '09:00:00',
        show: 0,
        CPC: 4.123555718924218,
        CR_perc: 5.838387551307971,
        ROAS: 10.360391211847485,
      },
      {
        time_part: '10:00:00',
        show: 0,
        CPC: 3.9396266032271408,
        CR_perc: 5.580264791063302,
        ROAS: 10.529590968987598,
      },
      {
        time_part: '11:00:00',
        show: 0,
        CPC: 3.9180505910165486,
        CR_perc: 5.617021276595745,
        ROAS: 10.753485625178826,
      },
      {
        time_part: '12:00:00',
        show: 0,
        CPC: 3.9566190635932337,
        CR_perc: 5.760291369147458,
        ROAS: 10.636427411531857,
      },
      {
        time_part: '13:00:00',
        show: 0,
        CPC: 3.8924939996799828,
        CR_perc: 5.578964211424609,
        ROAS: 10.570354329527243,
      },
      {
        time_part: '14:00:00',
        show: 0,
        CPC: 3.7661708774045053,
        CR_perc: 5.8036937578780075,
        ROAS: 11.588828183160624,
      },
      {
        time_part: '15:00:00',
        show: 0,
        CPC: 3.825196470097192,
        CR_perc: 6.183292588396637,
        ROAS: 11.854688922638399,
      },
      {
        time_part: '16:00:00',
        show: 0,
        CPC: 3.5255046564309085,
        CR_perc: 6.430908633274604,
        ROAS: 13.896443556464954,
      },
      {
        time_part: '17:00:00',
        show: 0,
        CPC: 3.7054652746255106,
        CR_perc: 6.990467544257831,
        ROAS: 13.602149622163369,
      },
      {
        time_part: '18:00:00',
        show: 0,
        CPC: 3.659126340973991,
        CR_perc: 6.899745311414679,
        ROAS: 14.14529468713155,
      },
      {
        time_part: '19:00:00',
        show: 0,
        CPC: 3.2201532934131736,
        CR_perc: 5.884231536926148,
        ROAS: 13.20258144688566,
      },
      {
        time_part: '20:00:00',
        show: 0,
        CPC: 3.052403094655404,
        CR_perc: 5.936685876687456,
        ROAS: 14.456961488734324,
      },
      {
        time_part: '21:00:00',
        show: 0,
        CPC: 2.983597807757167,
        CR_perc: 6.197301854974705,
        ROAS: 15.437579605414312,
      },
      {
        time_part: '22:00:00',
        show: 0,
        CPC: 2.6341743571364575,
        CR_perc: 5.080189947137353,
        ROAS: 14.554714928765353,
      },
      {
        time_part: '23:00:00',
        show: 0,
        CPC: 2.64048021895994,
        CR_perc: 4.827071410798706,
        ROAS: 13.763090965116202,
      },
    ],
    min_CPC: 2.5700977475563107,
    max_CPC: 5.080445182724253,
    min_CR_perc: 3.0821917808219177,
    max_CR_perc: 22.488755622188904,
    min_ROAS: 4.4871991301763865,
    max_ROAS: 39.43642782969886,
  },
  {
    weekNumber: 2,
    weekday: 'Monday',
    Total_CPC: 3.841220947367877,
    Total_CR_perc: 6.360942921111278,
    Total_ROAS: 12.186456607089609,
    Hourly_Data: [
      {
        time_part: '00:00:00',
        show: 0,
        CPC: 4.887493972676132,
        CR_perc: 5.665684436110367,
        ROAS: 8.580859758131194,
      },
      {
        time_part: '01:00:00',
        show: 0,
        CPC: 4.750279783393502,
        CR_perc: 5.257220216606498,
        ROAS: 8.234736316120463,
      },
      {
        time_part: '02:00:00',
        show: 0,
        CPC: 4.988974576271186,
        CR_perc: 5.127118644067796,
        ROAS: 7.382122273012185,
      },
      {
        time_part: '03:00:00',
        show: 0,
        CPC: 5.080445182724253,
        CR_perc: 5.780730897009967,
        ROAS: 8.535547019579994,
      },
      {
        time_part: '04:00:00',
        show: 0,
        CPC: 4.984477739726027,
        CR_perc: 3.0821917808219177,
        ROAS: 4.4871991301763865,
      },
      {
        time_part: '05:00:00',
        show: 0,
        CPC: 4.748408969567539,
        CR_perc: 4.217832354511479,
        ROAS: 6.281310400426365,
      },
      {
        time_part: '06:00:00',
        show: 0,
        CPC: 4.631240657698057,
        CR_perc: 4.857997010463378,
        ROAS: 7.770871122873834,
      },
      {
        time_part: '07:00:00',
        show: 0,
        CPC: 4.551698942452959,
        CR_perc: 5.740969647026508,
        ROAS: 9.162097491560283,
      },
      {
        time_part: '08:00:00',
        show: 0,
        CPC: 4.407733620770457,
        CR_perc: 6.036179585715624,
        ROAS: 10.212931709639603,
      },
      {
        time_part: '09:00:00',
        show: 0,
        CPC: 4.231983368306521,
        CR_perc: 6.388435532758219,
        ROAS: 11.197661539975902,
      },
      {
        time_part: '10:00:00',
        show: 0,
        CPC: 4.085815940607929,
        CR_perc: 6.128309287014988,
        ROAS: 10.915346241717131,
      },
      {
        time_part: '11:00:00',
        show: 0,
        CPC: 4.038747631678666,
        CR_perc: 6.264999368447645,
        ROAS: 11.440847806074572,
      },
      {
        time_part: '12:00:00',
        show: 0,
        CPC: 4.027425133866596,
        CR_perc: 5.909962319032195,
        ROAS: 10.71082316227439,
      },
      {
        time_part: '13:00:00',
        show: 0,
        CPC: 3.803593947976448,
        CR_perc: 6.208541402698069,
        ROAS: 11.71590086536468,
      },
      {
        time_part: '14:00:00',
        show: 0,
        CPC: 3.635067264573991,
        CR_perc: 6.334080717488789,
        ROAS: 12.896184622352553,
      },
      {
        time_part: '15:00:00',
        show: 0,
        CPC: 3.5138746682647035,
        CR_perc: 5.821419399024056,
        ROAS: 12.496349545151888,
      },
      {
        time_part: '16:00:00',
        show: 0,
        CPC: 3.4164426771512826,
        CR_perc: 5.79036725940488,
        ROAS: 12.775925296749621,
      },
      {
        time_part: '17:00:00',
        show: 0,
        CPC: 3.307220711297071,
        CR_perc: 7.175732217573222,
        ROAS: 15.899634469145267,
      },
      {
        time_part: '18:00:00',
        show: 0,
        CPC: 3.1622326930047118,
        CR_perc: 7.551045064636945,
        ROAS: 17.590213495938688,
      },
      {
        time_part: '19:00:00',
        show: 0,
        CPC: 2.9715376119769297,
        CR_perc: 7.497852497238925,
        ROAS: 18.38311860470302,
      },
      {
        time_part: '20:00:00',
        show: 0,
        CPC: 3.019852075254919,
        CR_perc: 8.114318540858825,
        ROAS: 19.661251624679046,
      },
      {
        time_part: '21:00:00',
        show: 0,
        CPC: 3.072631405503378,
        CR_perc: 7.480639314549349,
        ROAS: 17.796804985038452,
      },
      {
        time_part: '22:00:00',
        show: 0,
        CPC: 2.594247201279415,
        CR_perc: 7.699337445739091,
        ROAS: 21.747067816701335,
      },
      {
        time_part: '23:00:00',
        show: 0,
        CPC: 2.5700977475563107,
        CR_perc: 10.752231194220146,
        ROAS: 31.133683012977393,
      },
    ],
    min_CPC: 2.5700977475563107,
    max_CPC: 5.080445182724253,
    min_CR_perc: 3.0821917808219177,
    max_CR_perc: 22.488755622188904,
    min_ROAS: 4.4871991301763865,
    max_ROAS: 39.43642782969886,
  },
  {
    weekNumber: 3,
    weekday: 'Tuesday',
    Total_CPC: 3.7364594738627,
    Total_CR_perc: 5.895426578169662,
    Total_ROAS: 11.72296902751482,
    Hourly_Data: [
      {
        time_part: '00:00:00',
        show: 0,
        CPC: 4.530065327252557,
        CR_perc: 5.374090965117713,
        ROAS: 8.931673614961953,
      },
      {
        time_part: '01:00:00',
        show: 0,
        CPC: 4.34441291810842,
        CR_perc: 4.6366782006920415,
        ROAS: 7.6914447648625845,
      },
      {
        time_part: '02:00:00',
        show: 0,
        CPC: 4.512841296928328,
        CR_perc: 4.564846416382252,
        ROAS: 7.620209678486684,
      },
      {
        time_part: '03:00:00',
        show: 0,
        CPC: 4.6224660633484165,
        CR_perc: 5.429864253393665,
        ROAS: 8.995110443290441,
      },
      {
        time_part: '04:00:00',
        show: 0,
        CPC: 4.664615384615384,
        CR_perc: 4.765886287625419,
        ROAS: 7.572598801193071,
      },
      {
        time_part: '05:00:00',
        show: 0,
        CPC: 4.431454106280193,
        CR_perc: 4.830917874396135,
        ROAS: 7.985356111504168,
      },
      {
        time_part: '06:00:00',
        show: 0,
        CPC: 4.361000210570646,
        CR_perc: 5.559065066329754,
        ROAS: 9.501677177494003,
      },
      {
        time_part: '07:00:00',
        show: 0,
        CPC: 4.199947416552355,
        CR_perc: 6.218564243255601,
        ROAS: 10.941821892298389,
      },
      {
        time_part: '08:00:00',
        show: 0,
        CPC: 4.061443995786517,
        CR_perc: 6.539676966292135,
        ROAS: 11.67309393517805,
      },
      {
        time_part: '09:00:00',
        show: 0,
        CPC: 3.9856448121230867,
        CR_perc: 6.4481212308643885,
        ROAS: 11.959369416257857,
      },
      {
        time_part: '10:00:00',
        show: 0,
        CPC: 3.7615880525349525,
        CR_perc: 5.013416184154781,
        ROAS: 9.785951466456524,
      },
      {
        time_part: '11:00:00',
        show: 0,
        CPC: 3.583210422063081,
        CR_perc: 5.386256285235411,
        ROAS: 11.203932241934531,
      },
      {
        time_part: '12:00:00',
        show: 0,
        CPC: 3.7072285007946317,
        CR_perc: 5.774324562952499,
        ROAS: 11.478533307198926,
      },
      {
        time_part: '13:00:00',
        show: 0,
        CPC: 3.745072616537831,
        CR_perc: 6.430077301475754,
        ROAS: 12.636029601478384,
      },
      {
        time_part: '14:00:00',
        show: 0,
        CPC: 3.4793989415322577,
        CR_perc: 5.68296370967742,
        ROAS: 12.515676771144674,
      },
      {
        time_part: '15:00:00',
        show: 0,
        CPC: 3.4553274390870774,
        CR_perc: 5.109489051094891,
        ROAS: 11.123059913472105,
      },
      {
        time_part: '16:00:00',
        show: 0,
        CPC: 3.2570996369503833,
        CR_perc: 5.213795885437676,
        ROAS: 11.98893935734765,
      },
      {
        time_part: '17:00:00',
        show: 0,
        CPC: 3.431925925925926,
        CR_perc: 5.890652557319224,
        ROAS: 12.633959983596295,
      },
      {
        time_part: '18:00:00',
        show: 0,
        CPC: 3.4100046649043696,
        CR_perc: 7.945887109314259,
        ROAS: 17.186303166385006,
      },
      {
        time_part: '19:00:00',
        show: 0,
        CPC: 3.5080154355016537,
        CR_perc: 8.599779492833518,
        ROAS: 17.881953755299723,
      },
      {
        time_part: '20:00:00',
        show: 0,
        CPC: 3.11519046649012,
        CR_perc: 7.211244652678753,
        ROAS: 17.59440103528076,
      },
      {
        time_part: '21:00:00',
        show: 0,
        CPC: 2.8318199233716475,
        CR_perc: 6.343124733929331,
        ROAS: 17.198947826537953,
      },
      {
        time_part: '22:00:00',
        show: 0,
        CPC: 2.7108410041841005,
        CR_perc: 6.150627615062762,
        ROAS: 17.4618709011238,
      },
      {
        time_part: '23:00:00',
        show: 0,
        CPC: 2.780905923344948,
        CR_perc: 5.168408826945412,
        ROAS: 14.864648590855175,
      },
    ],
    min_CPC: 2.5700977475563107,
    max_CPC: 5.080445182724253,
    min_CR_perc: 3.0821917808219177,
    max_CR_perc: 22.488755622188904,
    min_ROAS: 4.4871991301763865,
    max_ROAS: 39.43642782969886,
  },
  {
    weekNumber: 4,
    weekday: 'Wednesday',
    Total_CPC: 3.908220752868737,
    Total_CR_perc: 7.269801287433529,
    Total_ROAS: 13.743417496159923,
    Hourly_Data: [
      {
        time_part: '00:00:00',
        show: 0,
        CPC: 4.594227175654031,
        CR_perc: 6.11318739989322,
        ROAS: 9.720347066163665,
      },
      {
        time_part: '01:00:00',
        show: 0,
        CPC: 4.662520880789673,
        CR_perc: 5.7960010124019234,
        ROAS: 9.370502159962044,
      },
      {
        time_part: '02:00:00',
        show: 0,
        CPC: 4.797308080808081,
        CR_perc: 4.242424242424243,
        ROAS: 6.71648241280095,
      },
      {
        time_part: '03:00:00',
        show: 0,
        CPC: 4.8310038910505835,
        CR_perc: 3.268482490272374,
        ROAS: 5.162405925410448,
      },
      {
        time_part: '04:00:00',
        show: 0,
        CPC: 4.631163976210705,
        CR_perc: 4.927782497875956,
        ROAS: 8.262031084889045,
      },
      {
        time_part: '05:00:00',
        show: 0,
        CPC: 4.516486199575371,
        CR_perc: 3.8747346072186835,
        ROAS: 6.2818031603960955,
      },
      {
        time_part: '06:00:00',
        show: 0,
        CPC: 4.4547455701953655,
        CR_perc: 6.201726487960018,
        ROAS: 10.400979816713997,
      },
      {
        time_part: '07:00:00',
        show: 0,
        CPC: 4.415183285374702,
        CR_perc: 5.992743650694358,
        ROAS: 9.946549728879338,
      },
      {
        time_part: '08:00:00',
        show: 0,
        CPC: 4.142452229299363,
        CR_perc: 5.772292993630574,
        ROAS: 10.341925543733135,
      },
      {
        time_part: '09:00:00',
        show: 0,
        CPC: 3.9655913618481624,
        CR_perc: 6.336318741106554,
        ROAS: 11.774783375533909,
      },
      {
        time_part: '10:00:00',
        show: 0,
        CPC: 3.843595118664371,
        CR_perc: 5.921988470464925,
        ROAS: 11.490478370202712,
      },
      {
        time_part: '11:00:00',
        show: 0,
        CPC: 3.8507805094786733,
        CR_perc: 6.664691943127962,
        ROAS: 12.809787861527118,
      },
      {
        time_part: '12:00:00',
        show: 0,
        CPC: 3.8410175284837864,
        CR_perc: 6.8361086765994745,
        ROAS: 13.099003536940735,
      },
      {
        time_part: '13:00:00',
        show: 0,
        CPC: 3.597012222725215,
        CR_perc: 6.84698958804889,
        ROAS: 14.073132346648544,
      },
      {
        time_part: '14:00:00',
        show: 0,
        CPC: 3.467068718682892,
        CR_perc: 7.158196134574088,
        ROAS: 14.923289208859856,
      },
      {
        time_part: '15:00:00',
        show: 0,
        CPC: 3.4955229244114,
        CR_perc: 7.5836431226765795,
        ROAS: 16.16306005876875,
      },
      {
        time_part: '16:00:00',
        show: 0,
        CPC: 3.411134624043224,
        CR_perc: 7.894341888038421,
        ROAS: 17.077041092659886,
      },
      {
        time_part: '17:00:00',
        show: 0,
        CPC: 3.515911401597676,
        CR_perc: 9.15032679738562,
        ROAS: 19.12242456226595,
      },
      {
        time_part: '18:00:00',
        show: 0,
        CPC: 3.4296865791588536,
        CR_perc: 9.91159924993303,
        ROAS: 21.439995407333583,
      },
      {
        time_part: '19:00:00',
        show: 0,
        CPC: 3.202344079542031,
        CR_perc: 12.232600180777343,
        ROAS: 28.39289161863579,
      },
      {
        time_part: '20:00:00',
        show: 0,
        CPC: 3.4480472440944885,
        CR_perc: 14.37007874015748,
        ROAS: 30.9154559696005,
      },
      {
        time_part: '21:00:00',
        show: 0,
        CPC: 4.020605908863295,
        CR_perc: 13.920881321982975,
        ROAS: 25.48518460858248,
      },
      {
        time_part: '22:00:00',
        show: 0,
        CPC: 3.8355313092979126,
        CR_perc: 15.180265654648956,
        ROAS: 29.218246694618628,
      },
      {
        time_part: '23:00:00',
        show: 0,
        CPC: 4.150862068965517,
        CR_perc: 22.488755622188904,
        ROAS: 39.43642782969886,
      },
    ],
    min_CPC: 2.5700977475563107,
    max_CPC: 5.080445182724253,
    min_CR_perc: 3.0821917808219177,
    max_CR_perc: 22.488755622188904,
    min_ROAS: 4.4871991301763865,
    max_ROAS: 39.43642782969886,
  },
  {
    weekNumber: 5,
    weekday: 'Thursday',
    Total_CPC: 3.7538958020352053,
    Total_CR_perc: 6.806457099124125,
    Total_ROAS: 13.329977987474336,
    Hourly_Data: [
      {
        time_part: '00:00:00',
        show: 0,
        CPC: 4.64468506452025,
        CR_perc: 5.9793024147182825,
        ROAS: 9.709934408778139,
      },
      {
        time_part: '01:00:00',
        show: 0,
        CPC: 4.401918290678563,
        CR_perc: 5.447288095797136,
        ROAS: 9.261689790305727,
      },
      {
        time_part: '02:00:00',
        show: 0,
        CPC: 4.4321750902527075,
        CR_perc: 4.377256317689531,
        ROAS: 6.7071840923669015,
      },
      {
        time_part: '03:00:00',
        show: 0,
        CPC: 4.581837881219904,
        CR_perc: 4.253611556982344,
        ROAS: 6.621267934496065,
      },
      {
        time_part: '04:00:00',
        show: 0,
        CPC: 4.494789674952199,
        CR_perc: 4.493307839388145,
        ROAS: 7.716540289904392,
      },
      {
        time_part: '05:00:00',
        show: 0,
        CPC: 4.459264939185616,
        CR_perc: 5.552617662612374,
        ROAS: 9.241142867985301,
      },
      {
        time_part: '06:00:00',
        show: 0,
        CPC: 4.206006993006993,
        CR_perc: 5.4312354312354305,
        ROAS: 9.47828751973673,
      },
      {
        time_part: '07:00:00',
        show: 0,
        CPC: 4.186415189236766,
        CR_perc: 6.048032189111027,
        ROAS: 10.398742617412575,
      },
      {
        time_part: '08:00:00',
        show: 0,
        CPC: 3.887081665332266,
        CR_perc: 6.214971977582065,
        ROAS: 11.97943625752194,
      },
      {
        time_part: '09:00:00',
        show: 0,
        CPC: 3.7327895433487757,
        CR_perc: 5.93150231634679,
        ROAS: 11.228171825869266,
      },
      {
        time_part: '10:00:00',
        show: 0,
        CPC: 3.633102363475034,
        CR_perc: 6.541905299669275,
        ROAS: 13.068649856115412,
      },
      {
        time_part: '11:00:00',
        show: 0,
        CPC: 3.613835593363093,
        CR_perc: 6.106291585951318,
        ROAS: 12.914885122661603,
      },
      {
        time_part: '12:00:00',
        show: 0,
        CPC: 3.6060096758587323,
        CR_perc: 7.237542331881955,
        ROAS: 15.044217160462392,
      },
      {
        time_part: '13:00:00',
        show: 0,
        CPC: 3.5137467959433857,
        CR_perc: 6.218655967903711,
        ROAS: 12.493341812340127,
      },
      {
        time_part: '14:00:00',
        show: 0,
        CPC: 3.6129647958609827,
        CR_perc: 7.839388145315487,
        ROAS: 15.895143242182284,
      },
      {
        time_part: '15:00:00',
        show: 0,
        CPC: 3.6579209486166007,
        CR_perc: 6.89064558629776,
        ROAS: 13.999470169956222,
      },
      {
        time_part: '16:00:00',
        show: 0,
        CPC: 3.5132913590968307,
        CR_perc: 7.29483282674772,
        ROAS: 15.35634871688392,
      },
      {
        time_part: '17:00:00',
        show: 0,
        CPC: 3.341316083916084,
        CR_perc: 6.223776223776223,
        ROAS: 14.278727740545264,
      },
      {
        time_part: '18:00:00',
        show: 0,
        CPC: 3.465048832271762,
        CR_perc: 10.89171974522293,
        ROAS: 22.71187864498253,
      },
      {
        time_part: '19:00:00',
        show: 0,
        CPC: 3.63987676979549,
        CR_perc: 11.903513371788149,
        ROAS: 23.28964040312653,
      },
      {
        time_part: '20:00:00',
        show: 0,
        CPC: 2.983617276544691,
        CR_perc: 5.518896220755849,
        ROAS: 13.85172980221928,
      },
      {
        time_part: '21:00:00',
        show: 0,
        CPC: 3.004274760383386,
        CR_perc: 9.329073482428115,
        ROAS: 22.711567542734635,
      },
      {
        time_part: '22:00:00',
        show: 0,
        CPC: 2.908109048723898,
        CR_perc: 10.730858468677495,
        ROAS: 26.677372256950125,
      },
      {
        time_part: '23:00:00',
        show: 0,
        CPC: 3.1875124688279306,
        CR_perc: 7.793017456359102,
        ROAS: 18.94025938972416,
      },
    ],
  },
  {
    weekNumber: 6,
    weekday: 'Friday',
    Total_CPC: 3.636730375974017,
    Total_CR_perc: 5.585479624159639,
    Total_ROAS: 11.474694789382283,
    Hourly_Data: [
      {
        time_part: '00:00:00',
        show: 0,
        CPC: 4.4444914541888485,
        CR_perc: 5.267581955729896,
        ROAS: 9.117762203551925,
      },
      {
        time_part: '01:00:00',
        show: 0,
        CPC: 4.2145130315500685,
        CR_perc: 4.938271604938271,
        ROAS: 8.80951054231573,
      },
      {
        time_part: '02:00:00',
        show: 0,
        CPC: 4.306116267708843,
        CR_perc: 4.298974108451392,
        ROAS: 7.3947135554340395,
      },
      {
        time_part: '03:00:00',
        show: 0,
        CPC: 4.479945904173107,
        CR_perc: 3.9412673879443583,
        ROAS: 7.211773229487412,
      },
      {
        time_part: '04:00:00',
        show: 0,
        CPC: 4.338916083916084,
        CR_perc: 3.234265734265734,
        ROAS: 5.816967919221874,
      },
      {
        time_part: '05:00:00',
        show: 0,
        CPC: 4.319207622868606,
        CR_perc: 4.112337011033099,
        ROAS: 7.525875181422351,
      },
      {
        time_part: '06:00:00',
        show: 0,
        CPC: 4.277357377049181,
        CR_perc: 4.327868852459017,
        ROAS: 7.546138236621253,
      },
      {
        time_part: '07:00:00',
        show: 0,
        CPC: 4.0000050012503126,
        CR_perc: 5.351337834458614,
        ROAS: 9.830052100459989,
      },
      {
        time_part: '08:00:00',
        show: 0,
        CPC: 3.8440936512496413,
        CR_perc: 5.132624724695969,
        ROAS: 9.512994885645055,
      },
      {
        time_part: '09:00:00',
        show: 0,
        CPC: 3.7419115848331295,
        CR_perc: 5.390529442600036,
        ROAS: 10.478887656105826,
      },
      {
        time_part: '10:00:00',
        show: 0,
        CPC: 3.7418612818261634,
        CR_perc: 5.571075105754649,
        ROAS: 10.926032458665178,
      },
      {
        time_part: '11:00:00',
        show: 0,
        CPC: 3.7144547697368417,
        CR_perc: 6.011513157894737,
        ROAS: 11.60978702291479,
      },
      {
        time_part: '12:00:00',
        show: 0,
        CPC: 3.5993370309385564,
        CR_perc: 5.3297512782736804,
        ROAS: 11.21120681871535,
      },
      {
        time_part: '13:00:00',
        show: 0,
        CPC: 3.3473590408295526,
        CR_perc: 5.82199179088356,
        ROAS: 13.387375866614393,
      },
      {
        time_part: '14:00:00',
        show: 0,
        CPC: 3.1789219620958753,
        CR_perc: 5.852842809364549,
        ROAS: 13.778923532339023,
      },
      {
        time_part: '15:00:00',
        show: 0,
        CPC: 3.2924347190307084,
        CR_perc: 5.118027992479632,
        ROAS: 11.970967366362993,
      },
      {
        time_part: '16:00:00',
        show: 0,
        CPC: 3.413286577992745,
        CR_perc: 5.380894800483675,
        ROAS: 11.831474768916404,
      },
      {
        time_part: '17:00:00',
        show: 0,
        CPC: 3.341316083916084,
        CR_perc: 6.223776223776223,
        ROAS: 14.278727740545264,
      },
      {
        time_part: '18:00:00',
        show: 0,
        CPC: 3.1409374478732275,
        CR_perc: 6.371976647206005,
        ROAS: 15.006620314903094,
      },
      {
        time_part: '19:00:00',
        show: 0,
        CPC: 3.3861697497279653,
        CR_perc: 6.256800870511425,
        ROAS: 14.02190549794498,
      },
      {
        time_part: '20:00:00',
        show: 0,
        CPC: 3.09329360780065,
        CR_perc: 6.428313470566992,
        ROAS: 16.51323650110387,
      },
      {
        time_part: '21:00:00',
        show: 0,
        CPC: 2.948398409255242,
        CR_perc: 7.411424439624007,
        ROAS: 19.600571164412706,
      },
      {
        time_part: '22:00:00',
        show: 0,
        CPC: 2.977220386974988,
        CR_perc: 7.881075979235488,
        ROAS: 18.56984686299778,
      },
      {
        time_part: '23:00:00',
        show: 0,
        CPC: 2.9410008779631256,
        CR_perc: 10.09657594381036,
        ROAS: 26.358976655322707,
      },
    ],
  },
  {
    weekNumber: 7,
    weekday: 'Saturday',
    Total_CPC: 3.9177495584686945,
    Total_CR_perc: 5.853917398406342,
    Total_ROAS: 11.155019398726774,
    Hourly_Data: [
      {
        time_part: '00:00:00',
        show: 0,
        CPC: 4.717057159026599,
        CR_perc: 4.685908319185059,
        ROAS: 7.4009758801397485,
      },
      {
        time_part: '01:00:00',
        show: 0,
        CPC: 4.598911439114391,
        CR_perc: 4.2988929889298895,
        ROAS: 7.164313310144789,
      },
      {
        time_part: '02:00:00',
        show: 0,
        CPC: 4.785992120343839,
        CR_perc: 3.9756446991404006,
        ROAS: 6.203762173068044,
      },
      {
        time_part: '03:00:00',
        show: 0,
        CPC: 4.909571663920922,
        CR_perc: 3.9538714991762767,
        ROAS: 6.470802531897593,
      },
      {
        time_part: '04:00:00',
        show: 0,
        CPC: 4.840457912457913,
        CR_perc: 3.4343434343434343,
        ROAS: 5.672447997239876,
      },
      {
        time_part: '05:00:00',
        show: 0,
        CPC: 4.675758487322733,
        CR_perc: 3.910614525139665,
        ROAS: 6.548830061881404,
      },
      {
        time_part: '06:00:00',
        show: 0,
        CPC: 4.526765827612509,
        CR_perc: 4.862700228832952,
        ROAS: 7.514779032755421,
      },
      {
        time_part: '07:00:00',
        show: 0,
        CPC: 4.452292640186916,
        CR_perc: 4.789719626168224,
        ROAS: 8.0547,
      },
      {
        time_part: '08:00:00',
        show: 0,
        CPC: 4.266474373197249,
        CR_perc: 5.30286221433326,
        ROAS: 9.483110059458804,
      },
      {
        time_part: '09:00:00',
        show: 0,
        CPC: 4.123555718924218,
        CR_perc: 5.838387551307971,
        ROAS: 10.360391211847485,
      },
      {
        time_part: '10:00:00',
        show: 0,
        CPC: 3.9396266032271408,
        CR_perc: 5.580264791063302,
        ROAS: 10.529590968987598,
      },
      {
        time_part: '11:00:00',
        show: 0,
        CPC: 3.9180505910165486,
        CR_perc: 5.617021276595745,
        ROAS: 10.753485625178826,
      },
      {
        time_part: '12:00:00',
        show: 0,
        CPC: 3.9566190635932337,
        CR_perc: 5.760291369147458,
        ROAS: 10.636427411531857,
      },
      {
        time_part: '13:00:00',
        show: 0,
        CPC: 3.8924939996799828,
        CR_perc: 5.578964211424609,
        ROAS: 10.570354329527243,
      },
      {
        time_part: '14:00:00',
        show: 0,
        CPC: 3.7661708774045053,
        CR_perc: 5.8036937578780075,
        ROAS: 11.588828183160624,
      },
      {
        time_part: '15:00:00',
        show: 0,
        CPC: 3.825196470097192,
        CR_perc: 6.183292588396637,
        ROAS: 11.854688922638399,
      },
      {
        time_part: '16:00:00',
        show: 0,
        CPC: 3.5255046564309085,
        CR_perc: 6.430908633274604,
        ROAS: 13.896443556464954,
      },
      {
        time_part: '17:00:00',
        show: 0,
        CPC: 3.7054652746255106,
        CR_perc: 6.990467544257831,
        ROAS: 13.602149622163369,
      },
      {
        time_part: '18:00:00',
        show: 0,
        CPC: 3.659126340973991,
        CR_perc: 6.899745311414679,
        ROAS: 14.14529468713155,
      },
      {
        time_part: '19:00:00',
        show: 0,
        CPC: 3.2201532934131736,
        CR_perc: 5.884231536926148,
        ROAS: 13.20258144688566,
      },
      {
        time_part: '20:00:00',
        show: 0,
        CPC: 3.052403094655404,
        CR_perc: 5.936685876687456,
        ROAS: 14.456961488734324,
      },
      {
        time_part: '21:00:00',
        show: 0,
        CPC: 2.983597807757167,
        CR_perc: 6.197301854974705,
        ROAS: 15.437579605414312,
      },
      {
        time_part: '22:00:00',
        show: 0,
        CPC: 2.6341743571364575,
        CR_perc: 5.080189947137353,
        ROAS: 14.554714928765353,
      },
      {
        time_part: '23:00:00',
        show: 0,
        CPC: 2.64048021895994,
        CR_perc: 4.827071410798706,
        ROAS: 13.763090965116202,
      },
    ],
  },
];

const useHeatmapData = (userIdentityConstant, useMockData = false) => {
  const [heatmapData, setHeatmapData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiResponseMessage, setApiResponseMessage] = useState('');
  const [metricRanges, setMetricRanges] = useState({});

  const metricsToSend = heatmapMetrics.map((metric) => metric.value);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setApiResponseMessage('');
      setHeatmapData([]);

      if (useMockData) {
        // Simulate API call delay with setTimeout
        setTimeout(() => {
          setApiResponseMessage('Displaying mock data.');
          const sortedData = [...MOCK_HEATMAP_DATA].sort(
            (a, b) => a.weekNumber - b.weekNumber,
          );
          setHeatmapData(sortedData);
          setLoading(false);
        }, 500); // Simulate network delay
        return;
      }

      try {
        const response = await api.post(
          '/day-parting/heatmap-list',
          {
            startDate: '2024-06-08',
            endDate: '2024-07-07',
            metrics: metricsToSend,
          },
          {
            headers: {
              'X-USER-IDENTITY': userIdentityConstant,
            },
          },
        );

        if (response.data && response.data.message) {
          setApiResponseMessage(response.data.message);
        }

        if (response.data && Array.isArray(response.data.result)) {
          const sortedData = [...response.data.result].sort(
            (a, b) => a.weekNumber - b.weekNumber,
          );
          setHeatmapData(sortedData);
        } else {
          setHeatmapData([]);
          setError(
            response.data.message ||
              'API returned an unexpected data format or no "result" array for heatmap.',
          );
        }
      } catch (err) {
        if (err.response) {
          setError(
            err.response.data.message ||
              'Failed to fetch heatmap data from the server.',
          );
          console.error(
            'useHeatmapData Hook - API Error Response:',
            err.response.data,
          );
        } else if (err.request) {
          setError('Network error: No response received for heatmap data.');
          console.error(
            'useHeatmapData Hook - Network Request Error:',
            err.request,
          );
        } else {
          setError(
            'An unexpected error occurred while setting up the heatmap data request.',
          );
          console.error(
            'useHeatmapData Hook - Request Setup Error:',
            err.message,
          );
        }
        setHeatmapData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userIdentityConstant, useMockData]); // Depend on useMockData to re-fetch when it changes

  // Effect to calculate min/max values for each metric across all hourly and total data
  useEffect(() => {
    const newMetricRanges = {};

    heatmapMetrics.forEach((metric) => {
      let currentMin = Infinity;
      let currentMax = -Infinity;

      heatmapData.forEach((day) => {
        day.Hourly_Data.forEach((hour) => {
          const value = hour[metric.value];
          if (typeof value === 'number' && !isNaN(value)) {
            currentMin = Math.min(currentMin, value);
            currentMax = Math.max(currentMax, value);
          }
        });
        const totalValue = day[`Total_${metric.value}`];
        if (typeof totalValue === 'number' && !isNaN(totalValue)) {
          currentMin = Math.min(currentMin, totalValue);
          currentMax = Math.max(currentMax, totalValue);
        }
      });

      newMetricRanges[metric.value] = {
        min: currentMin === Infinity ? 0 : currentMin,
        max: currentMax === -Infinity ? 0 : currentMax,
      };
    });
    setMetricRanges(newMetricRanges);
  }, [heatmapData]);

  return { heatmapData, loading, error, apiResponseMessage, metricRanges };
};

export default useHeatmapData;
