#ifdef USE_TEX_COLOR
    #ifdef BLEND_MODE_MULTIPLY
        col.rgb *= frag_instColor.rgb;
        col.a *= frag_instColor.a;
    #endif

    #ifdef BLEND_MODE_ADD
        col.rgb += frag_instColor.rgb;
        col.a += frag_instColor.a;
    #endif

    #ifdef BLEND_MODE_NONE
        col.rgb = frag_instColor.rgb;
        col.a = frag_instColor.a;
    #endif
#endif
