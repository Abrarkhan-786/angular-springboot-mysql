 export const  regix_patterns={
    ONLY_ALPHABETS : "^[A-Za-z ]+$",
    EMAIL : "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$",
    ONLY_PHONE : "^(?:(?:\\+|0{0,2})91|[0]?)?[0-9]+$",
    ONLY_ALPHABETS_WITH_SPACE : "^[a-zA-Z ]*$",
    ONLY_ALPHABETS_WITH_SPACE_SPECIAL_CHAR : "^[ A-Za-z0-9_@.~!@#$%^*/#&+-]*$",
    ONLY_NUMERIC_FLOAT : "^[+-]?([0-9,]*[.])?[0-9]+$",
    ONLY_ALPHA_NUMERIC_WITH_SPACE : "^[a-zA-Z0-9 ]*$",
    ONLY_ALPHA_NUMERIC : "^[a-zA-Z0-9]*$",
    ONLY_NUMERIC : "^[0-9]*$",
}