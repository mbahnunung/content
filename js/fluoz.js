/*
The MIT License (MIT) 
PARAN JARE RIKO

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var mrpjq = jQuery;
(function (d) {
    d.fn.mrp = function (b) {
        function Za(a) {
            if (n) {
                if (!U) {
                    if ("touchstart" == a.type) {
                        if (a = a.originalEvent.touches, !(a && 0 < a.length)) return !1
                    } else a.preventDefault();
                    U = !0;
                    P.on(J, function (a) {
                        a: {
                            if ("touchmove" == a.type) {
                                if (a.originalEvent.touches
                                    && a.originalEvent.touches.length) var c = a.originalEvent.touches;
                                else if (a.originalEvent.changedTouches && a.originalEvent.changedTouches.length) c = a.originalEvent.changedTouches;
                                else break a;
                                if (1 < c.length) break a;
                                c = c[0]
                            } else c = a;a.preventDefault();Ga(c)
                        }
                    }).on(V, function (a) {
                        a: if (U) {
                            U = !1;
                            P.off(J).off(V);
                            if ("touchend" == a.type) {
                                if (a.originalEvent.touches && a.originalEvent.touches.length) var c = a.originalEvent.touches;
                                else if (a.originalEvent.changedTouches && a.originalEvent.changedTouches.length) c = a.originalEvent.changedTouches;
                                else break a;
                                if (1 < c.length) break a;
                                c = c[0]
                            } else c = a;
                            a.preventDefault();
                            Ga(c)
                        }
                    })
                }
                return !1
            }
        }

        function E() {
            if (!n) return !1;
            0 < g ? (la = g, g = 0) : g = la;
            W()
        }

        function Ga(a) {
            F ? (g = Math.max(0, Math.min(1, (a.pageY - A.offset().top) / B)), g = 1 - g) : g = Math.max(0, Math.min(1, (a.pageX - A.offset().left) / B));
            W()
        }

        function W(a) {
            "undefined" !== typeof a && (g = a);
            h && (h.volume = g);
            a = F ? "height" : "width";
            MRPUtils.isNumber(B) || (B = F ? A.height() : A.width());
            $a.css(a, g * B + "px");
            0 == g ? (Q.find(".mrp-volume-icon").hide(), Q.find(".mrp-mute-icon").show()) : (Q.find(".mrp-volume-icon").show(),
                Q.find(".mrp-mute-icon").hide())
        }

        function Ha(a) {
            var c = F ? a.pageY - A.offset().top : a.pageX - A.offset().left;
            0 > c ? c = 0 : c > B && (c = B);
            c = Math.max(0, Math.min(1, c / B));
            if (!MRPUtils.isNumber(c)) return !1;
            F && (c = 1 - c);
            c = parseInt(100 * c, 10);
            t.text(c + " %");
            c = e[0].getBoundingClientRect();
            var f = y[0].getBoundingClientRect();
            if (F) {
                var m = parseInt(f.left - c.left - t.outerWidth() / 2 + y.outerWidth() / 2);
                a = parseInt(a.pageY - Ia.scrollTop() - c.top - t.outerHeight() - 10)
            } else m = parseInt(a.pageX - Ia.scrollLeft() - c.left - t.outerWidth() / 2), a = parseInt(f.top
                - c.top - t.outerHeight());
            0 > a + c.top && (a = parseInt(f.top - c.top + t.outerHeight() + 15));
            t.css({
                left: m + "px",
                top: a + "px"
            }).show()
        }

        function ab(a) {
            if (!n) return !1;
            a = d(a.currentTarget);
            if (a.hasClass("mrp-playback-toggle")) p.togglePlayback();
            else if (a.hasClass("mrp-volume-btn")) R && void 0 == a.attr("data-toggle-mute") || E();
            else if (a.hasClass("mrp-popup-toggle")) p.openPopup();
            else if (a.hasClass("mrp-share-item")) {
                a = a.attr("data-type").toLowerCase();
                var c = (window.screen.width - 600) / 2,
                    f = (window.screen.height - 300) / 2,
                    m = z
                    || "",
                    b = k.description || "",
                    e = Ja || "",
                    h = k.share || window.location.href,
                    g;
                MRPUtils.relativePath(e) || (e = MRPUtils.qualifyURL(e));
                "facebook" == a ? window.FB && FB.ui({
                    method: "share_open_graph",
                    action_type: "og.shares",
                    action_properties: JSON.stringify({
                        object: {
                            "og:url": h,
                            "og:title": m,
                            "og:description": b,
                            "og:image": e
                        }
                    })
                }) : "twitter" == a ? g = Ka + "//twitter.com/share?url=" + encodeURIComponent(h) + "&text=" + encodeURIComponent(m) : "tumblr" == a && (g = Ka + "//www.tumblr.com/share/link?url=" + encodeURIComponent(h) + "&amp;name=" + encodeURIComponent(m)
                    + "&amp;description=" + encodeURIComponent(b));
                g && window.open(g, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=600,height=300,left=" + c + ",top=" + f)
            }
        }

        function X(a) {
            if ("undefined" === typeof mCustomScrollbar)
                if (window.playlistScrollLoading) var c = setInterval(function () {
                    playlistScrollLoading || (clearInterval(c), X(a))
                }, 100);
                else {
                    window.playlistScrollLoading = !0;
                    var f = document.createElement("script");
                    f.type = "text/javascript";
                    f.src = MRPUtils.qualifyURL(ma + "https://cdnjs.cloudflare.com/ajax/libs/malihu-custom-scrollbar-plugin/3.1.5/jquery.mCustomScrollbar.concat.min.js");
                    f.onload =
                        f.onreadystatechange = function () {
                            this.readyState && "complete" != this.readyState || (X(a), window.playlistScrollLoading = !1)
                        };
                    f.onerror = function () {
                        alert("Error loading " + this.src)
                    };
                    var m = document.getElementsByTagName("script")[0];
                    m.parentNode.insertBefore(f, m)
                }
            else a.mCustomScrollbar({
                axis: "horizontal" == bb ? "x" : "y",
                theme: b.scrollTheme,
                scrollInertia: 0,
                mouseWheel: {
                    normalizeDelta: !0,
                    deltaFactor: 50,
                    preventDefault: !0
                },
                keyboard: {
                    enable: !1
                },
                advanced: {
                    autoExpandHorizontalScroll: !0
                },
                callbacks: {
                    onOverflowYNone: function () {
                        a.find(".mCSB_container").addClass("mrp-mCSB_full")
                    },
                    onOverflowY: function () {
                        a.find(".mCSB_container").removeClass("mrp-mCSB_full")
                    }
                }
            })
        }

        function na(a) {
            S = !0;
            oa.show();
            pa && La();
            pa = a;
            k = cb(a);
            v = k.type;
            W(g);
            Ma ? (Ma = !1, setTimeout(function () {
                Na()
            }, 250)) : Na()
        }

        function qa() {
            var a = k.radio;
            ";" == a.substring(a.length - 1) && (a = a.substring(0, a.length - 1));
            window.radioDataXHR && window.radioDataXHR.abort();
            var c = new XMLHttpRequest;
            c.onerror = function (a) {};
            c.onreadystatechange = function () {
                if (4 === this.readyState)
                    if (200 === this.status) {
                        if (k.version && 1 == k.version) var a = c.responseText.split(","),
                            m = a[6];
                        else a = JSON.parse(c.responseText), m = a.songtitle;
                        G = a;
                        if (Y) z ? z != m && ra() : ra();
                        else {
                            var b = m.split("-");
                            a = d.trim(b[0]);
                            b = d.trim(b[1]);
                            q = [];
                            w = -1;
                            q.push({
                                artist: a,
                                title: b,
                                thumb: C
                            });
                            K = 1;
                            z ? z != m && (C ? D() : H()) : C ? D() : H()
                        }
                        z = m
                    } else L || (r && clearInterval(r), r = setInterval(function () {
                        qa()
                    }, Z))
            };
            k.version && 1 == k.version ? c.open("GET", M[x] + a + "7.html", !0) : c.open("GET", M[x] + a + "/stats?sid=1&json=1", !0);
            c.send();
            window.radioDataXHR = c
        }

        function ra() {
            q = [];
            w = -1;
            var a = k.radio;
            ";" == a.substring(a.length - 1) && (a = a.substring(0,
                a.length - 1));
            window.radioXHR && window.radioXHR.abort();
            var c = new XMLHttpRequest;
            c.onerror = function (a) {};
            c.onreadystatechange = function () {
                if (4 === this.readyState)
                    if (200 === this.status) {
                        var a = c.responseText,
                            b = a.indexOf("Song Title") + 12;
                        a = a.substr(b, a.length);
                        a = a.split("</td><td>");
                        a.shift();
                        var d;
                        K = a.length;
                        Oa && (K = 1);
                        for (d = 0; d < K; d++) {
                            b = a[d].indexOf("</");
                            a[d] = a[d].substr(0, b);
                            a[d] = a[d].replace(/<\/?[^>]+(>|$)/g, "");
                            var e = a[d].split(" - ");
                            b = e[0].trim();
                            e = e[1] ? e[1].trim() : "";
                            0 == d ? q.push({
                                artist: b,
                                title: e,
                                thumb: C
                            }) : q.push({
                                artist: b,
                                title: e,
                                thumb: sa
                            })
                        }
                        C || sa ? D() : H()
                    } else L || (r && clearInterval(r), r = setInterval(function () {
                        ra()
                    }, Z))
            };
            c.open("GET", M[x] + a + "played.html");
            c.send();
            window.radioXHR = c
        }

        function aa() {
            console.log("getIcecastData");
            var a = k.radio;
            ";" == a.substring(a.length - 1) && (a = a.substring(0, a.length - 1));
            window.radioXHR && window.radioXHR.abort();
            a = new XMLHttpRequest;
            a.onerror = function (a) {};
            a.onreadystatechange = function () {
                if (4 === this.readyState)
                    if (200 === this.status) {
                        if (-1 < this.responseText.indexOf('{"icestats":')) {
                            var a =
                                JSON.parse(this.responseText);
                            if (void 0 === a.icestats.source.length) var f = a.icestats.source;
                            else {
                                var b, e = a.icestats.source.length;
                                for (b = 0; b < e; b++)
                                    if (0 <= a.icestats.source[b].listenurl.indexOf(k.mountpoint)) {
                                        f = a.icestats.source[b];
                                        break
                                    }
                            }
                            G = f;
                            a = f.title
                        } else -1 < this.responseText.indexOf('class="streamdata"') ? -1 < this.responseText.indexOf("Mount Point /" + k.mountpoint) && (f = this.responseText.substr(this.responseText.indexOf("Mount Point /" + k.mountpoint)), f = f.substr(f.indexOf("Current Song:")), f = f.substr(f.indexOf('<td class="streamdata">')
                            + 23), f = f.substr(0, f.indexOf("</td>")), MRPUtils.isEmpty(f) || (a = f)) : -1 < this.responseText.indexOf('class="streamstats"') && -1 < this.responseText.indexOf("Mount Point /" + k.mountpoint) && (f = this.responseText.substr(this.responseText.indexOf("Mount Point /" + k.mountpoint)), f = f.substr(f.indexOf("Currently playing:")), f = f.substr(f.indexOf('<td class="streamstats">') + 24), f = f.substr(0, f.indexOf("</td>")), MRPUtils.isEmpty(f) || (a = f));
                        a ? (b = a.split("-"), f = d.trim(b[0]), b = d.trim(b[1]), q = [], w = -1, q.push({
                            artist: f,
                            title: b,
                            thumb: !0
                        }), K = 1, z ? z != a && (C ? D() : H()) : C ? D() : H(), z = a) : (ba({
                            artist: db,
                            title: eb,
                            thumb: ta
                        }), oa.hide())
                    } else 404 == this.status && "Not Found" == this.statusText ? (console.log(ua[ca] + " does not exist!"), ca++, ua[ca] && !L && (r && clearInterval(r), aa())) : L || (r && clearInterval(r), r = setInterval(function () {
                        aa()
                    }, Z))
            };
            a.open("GET", M[x] + k.radio + ua[ca], !0);
            a.send();
            window.radioXHR = a
        }

        function H() {
            oa.hide();
            x = 0;
            if ("shoutcast" == v)
                if (Oa) {
                    var a = q.shift();
                    ba(a);
                    Y && (0 == l.length ? l.push(a) : (l[0].artist == a.artist && l[0].title == a.title
                        && l[0].thumb == a.thumb || l.unshift(a), 10 < l.length && l.pop(), 1 < l.length && va(l.slice(1))))
                } else ba(q.shift()), Y && va(q);
            else "icecast" == v && (a = q.shift(), ba(a), Y && (0 == l.length ? l.push(a) : (l[0].artist == a.artist && l[0].title == a.title && l[0].thumb == a.thumb || l.unshift(a), 10 < l.length && l.pop(), 1 < l.length && va(l.slice(1)))));
            L = !0;
            S = !1;
            r && clearInterval(r);
            r = setInterval(function () {
                "shoutcast" == v ? qa() : "icecast" == v && aa()
            }, Z)
        }

        function D() {
            w++;
            if (w == K) H();
            else if (!sa && 0 < w) H();
            else if (q[w].thumb) {
                var a = q[w].artist,
                    c = q[w].title,
                    b, d = wa.length;
                const Commercial_Break = 'https://live.staticflickr.com/65535/55032544297_53d5328f81_z.jpg';
                const Bintang_Tenggara = 'https://cdn.bintangtenggarafm.com/img/f69c7be1aa497aaa87f40d2306c4b3577.png';
                const JINGLESETELAHIKLAN = 'https://live.staticflickr.com/65535/53804698952_be7cefe6cd_z.jpg';
                const TS = 'https://warningfm.github.io/v3/img/vAFxMxc.png';
                const Dengarkami = 'https://live.staticflickr.com/65535/55120669630_c789fc91c8.jpg';
                const JINGLE = 'https://lastfm.freetls.fastly.net/i/u/ar0/a25b0e8fa1772422c6ebb3dd61316df2.png';
                const TANDAWAKTUSHOLATDHUHUR = 'https://live.staticflickr.com/65535/53815587960_2ded7e8990_z.jpg';
                const ASHAR = 'https://live.staticflickr.com/65535/53808429057_45e11e4986_z.jpg';
                const ADZANMAGHRIB = 'https://i.scdn.co/image/ab67616d0000b273f9fc89132411c52d8c6bc537';
                const OpeningRadio = 'https://cdn.bintangtenggarafm.com/img/MJMi7Kc.png';
                const LAGUPENUTUPRADIO = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiNEamewgAbyAZFYi_B0GkmXat8Z1aglWgubnf10D8etRJu2ZtJUQDvDUxFShoWWbHougyHjr0tFz3E38fX8e0bnTUpya-P0mXW-mrvdbrRrzq3KSFx3e_4hN5jizPhyFBuFCmqvogZS99aGrfi6GrQMBd0l59bWk1THfsXR1-44zhIPuSMQV64kylXQ-YZ/s1600/penutupan.jpg';
                const Citizen = 'https://thumbs2.imgbox.com/b1/29/LxXCnvNr_t.jpg';
                const JELAJAHDESA = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEju93kG2MbF4wulmf2HqIsNtbLeAh57ldbuKD6gRRM-DzUl-so8as-uaaUJzO_YaHWuVo7cLro1Ihp5LuyTsppRk_7Al2T7Om5CSUqiLlhkSYdL0QDajPjeIfW7jrPKzGe6D4_TKsj6BDoRYDlSYOAmIlcduoM3lQQFU4oThuM671dzfstZqQRH0G5K6QD2/s1600/Jelajahdesa.jpg';
                const WISATABUDAYA = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj76_ShbSLBp_jr_Og-mX5b-010-7qIIEPM3ZZeN84zyldmyMX2NS-yLfMPZLa46N7tBFwX8EKlwbUe-9wqU6U_0FO2jV54YFdV0AEvhW0r8jAa5YAE-5TCHgS-uB2HUVHHj0MN9P8xhg5jHAFY-3tMvD_u1BvHdUScYgev4ZcBSCrepzs_75lcKn4dAOdN/s1600/G8Qnr1y.jpg';
                const SHOLAWAT = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiIpqY48J4bs8uxDW02DXU_87iAkbYboTn0pxJQ5p0wyoQKt4YYr7BnqczK2UhAcbHkeUyM2m-5IHhUD_jTvWts-7HPMgRUQDvDUxFShoWWbHougyHjr0tFz3E38fX8e0bnTUpya-P0mXW_r1WaC2kcUgwkAP9zWSXLzvocqlz-0Y8NU3ViCiC-T9Jfb5bz/s1600/Wf3SDEt.png';
                const RadioBintangTenggara = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjLSPAs-qRbddzeii-poy3k5Tsz26fYDw8AFeK04iNOxM1HCD6zMOmi5i9bhK6FBGDree32YzCUhiThpyFYr5Cd9A4yiHlOH9MnYPlH3psMW_zzRL0I6yCuMuAA1RvFfGSJEsY0UQDvDUxFShoWWbHougyHjr0tFz3E38fX8e0bnTUpya-P0mXW-aJ_U_1I/s1600/fF8yUE0.png';
                const AlffyRev  = 'https://i.scdn.co/image/ab67616d0000b273d0572746e75788f3a073899b';
                const Ajeng = 'https://i.scdn.co/image/ab67616d0000b273f82c2fa93ef91d7cc86be1d2';
                const Agnes_Monica = 'https://i.scdn.co/image/ab6761610000e5eb09160e5ffdc256e65713a8a9';
                const INNA_Ft_Yandel = 'https://i1.sndcdn.com/artworks-000060831547-7emuqa-t500x500.jpg';
                const SOLUSI_SEHAT = 'https://images2.imgbox.com/f8/ca/GwuLQxLZ_o.jpg';
                const Ari_Lasso = 'https://i.scdn.co/image/ab6761610000e5eb4e1ed336c3ff93a95fa44e14';
                const Gracie_Abrams = 'https://i.scdn.co/image/ab67616d0000b2733be2b12525a2f506780901a3';
                const Andmesh = 'https://i1.sndcdn.com/artworks-000644192974-fr8aja-t500x500.jpg';
                const Dewa_19_Ft_Virzha = 'https://i.scdn.co/image/ab67616d0000b2734383e26d01a2dd18452b7b37';
                const Dewa_19_Ft_Ello = 'https://i.scdn.co/image/ab67616d0000b2730b591f8644a5a5106169a30a';
                const Libianca_Ft_Cian_Ducrot = 'https://i.scdn.co/image/ab67616d0000b273d14949518f0851b6d9e61eeb';
                const TRIAD = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg9VTihL_Wl56YYsKExxz0JJk3GD8LS6roXDK7lz01orNPSLAOpUxVMdSOcKeI3LzUDHnhUFAgvfZmOyyeq-52UEqVkIaA9wzioIrgRvIP8cuCyywILD3-IVphe-VpLF4d6WMyH4jROrHICBlTTb1mMj20ezaD_Ue9GJ_nNOb3I4LsSCbIGNkmoxvvpv6Ov/s1600/2281e5d180adff9b.jpg';
                const Kotak = 'https://i.scdn.co/image/ab67616d0000b273db843f40730bee6fb77ecb13';
                const Kirana_Setio = 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/9c/43/2e/9c432e8e-15ec-e94f-35f3-8322ca48bab3/artwork.jpg/1200x1200bf-60.jpg';
                const Fadly_Ft_Natasha = 'https://i.scdn.co/image/ab67616d0000b2737022d4a537820482e1034044';
                const Alma_Esbeye = 'https://i.scdn.co/image/ab67616d0000b2739e7d30df02b301c12516ca65'; 
                const TAHUKAH_ANDA = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhlgtNm-H7v4NN3ibwE-_yLPhMVdetUfOUYL9x8YYs4QQRpzvo0emUq1OuaR-LMMAoNKeqJxHK4TFavoPS8GfxZyJdOpdnf0RPn5UlQ4kURFbcdMRr7sB37xM-Qb0QxzmDq65Eh9FkQHEM6UQDvDUxFShoWWbHougyHjr0tFz3E38fX8e0bnTUpya-P0mXW/s1600/taukahAnda.jpg'; 
                const Alfina_Nindiyani  = 'https://i.scdn.co/image/ab67616d0000b273946b5d7310dc575af58ac613'; 
                const OPENING  = 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/grand-opening-design-template-3a37c804c55cf85d2ba959af479c656d_screen.jpg?ts=1575735007'; 
                const TS_MAGHRIB  = 'https://thumbs2.imgbox.com/ee/79/665Dlrr2_t.jpg';
                const Galang_Sanubari  = 'https://cdn.bintangtenggarafm.com/img/Galang_Sanubari.jpg';
                const Sarah_Sofyan  = 'https://cdn.bintangtenggarafm.com/img/Sarah_Sofyan.jpg';
                const Zefya_Rani  = 'https://cdn.bintangtenggarafm.com/img/Zefya_Rani.jpg';
                const Rima_Indah  = 'https://cdn.bintangtenggarafm.com/img/Rima_Indah.jpg';
                const Okki_Nila  = 'https://cdn.bintangtenggarafm.com/img/Okki_Nila.jpg';
                const Anita_Sumardi  = 'https://cdn.bintangtenggarafm.com/img/Anita_Sumardi.jpg';
                const Nurul_Hidayah  = 'https://cdn.bintangtenggarafm.com/img/Nurul_Hidayah.jpg';
                const CLOSING  = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjvJpO-eAcjIJ4w2y6YQMxNpaB7FEO9Z_GqZUDsp97gUQDvDUxFShoWWbHougyHjr0tFz3E38fX8e0bnTUpya-P0mXW-rWw-1ik3rhtU5hDJ1uyy184-w7U6Gmisnp58bcOFIeS9lxFEg7RI_VenietESGTzEgnz5TBkYH9WBvpD-aylJtfqfyqGwm93L1a/s1600/ms5QoI6.jpg'; 
                const Alda_Risma  = 'https://i.scdn.co/image/ab67616d0000b2734fd8f936305cb28b2bb53ab7'; 
                const PERISTIWA_HARI_INI  = 'https://cdn.bintangtenggarafm.com/img/nTZlhHe.jpg'; 
                const BMKG  = 'https://thumbs2.imgbox.com/8a/f0/fFJLDlC0_t.jpg'; 
                const Mayang_Sari  = 'https://i.scdn.co/image/ab67616d0000b2733deb71f184e845a821d500d6'; 
                const Samsons = 'https://images.genius.com/6ef0ad66be031798666d9f8e2305aca9.640x640x1.jpg';
                const Daeng_syawal_mubarok = 'https://i.scdn.co/image/ab67616d00001e02d614531c0de5a49b7f6ad166';
                const TANDA_WAKTU_SHOLAT_ISYA = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjzt-WdylfzOt4IZmb5vj6PbWsGNOGpV8YlrDTs7fejgDXPUhPI3BZ46RGlcEQGZJ9odFY0F6b9nNLHLHkXQRv8ihvehx7hIv6fz9gsclWh-gA22pMZuoVZNQvralLXFH6DLGAuAIWN400HhQkL3XmycIIopi0EZCT8TqTdhpFUYSMsFrz-jGhGOtluDwW3/s1600/uSKMZns.jpg'; 
                const Anisa_Rahman = 'https://i.scdn.co/image/ab67616d0000b273948e6ac1d0bc98d8269b9697'; 
                const Anggun = 'https://i.scdn.co/image/ab67616d0000b273068bcbbb986ad0ee76c02f76'; 
                const Power_Slaves = 'https://i.scdn.co/image/ab67616d0000b2733fd1e0089d0b10e143ea976f'; 
                const Second_Civil = 'https://i.scdn.co/image/ab67616d0000b2732f75cb4fe81408c68d9e847d'; 
                const Ismi_Azis = 'https://i.scdn.co/image/ab67616d0000b273835d5ee8832686e418f78e4f'; 
                const IKLAN = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh3kvdmC7dAKO4NEBIHYqzIVCpCUjPipqTOwGJ-PZceBRYHQIhRI61imk6t2QXqJBBRsI4MYazWX1ecCGLery0jUwK9fkPpv7YQHKvE1W4OzRqHpal3VMsAvwl1pwYx28_-wP1KS9nq2EaR2E2qv3hw0k_mbfo9FagXNwhYNaOmZGRreSQwn2XsZ4FCyiw_/s1600/1200x1200iklan.jpg';
                const Station_Offline = 'https://cdn.bintangtenggarafm.com/img/offline.jpg';
                
            if (a == 'Commercial Break') {var u = Commercial_Break;}
                else if (a == 'Bintang Tenggara') {var u = Bintang_Tenggara;}
                else if (a == 'JINGLE SETELAH IKLAN') {var u = JINGLESETELAHIKLAN;}
                else if (a == 'TS') {var u = TS;}
                else if (a == 'DENGAR KAMI') {var u = Dengarkami;}
                else if (a == 'JINGLE') {var u = JINGLE;}
                else if (a == 'TANDA WAKTU SHOLAT DHUHUR') {var u = TANDAWAKTUSHOLATDHUHUR;}
                else if (a == 'TANDA WAKTU SHOLAT ASHAR') {var u = ASHAR;}
                else if (a == 'ADZAN MAGHRIB') {var u = ADZANMAGHRIB;}
                else if (a == 'Opening Radio') {var u = OpeningRadio;}
                else if (a == 'LAGU PENUTUP RADIO') {var u = LAGUPENUTUPRADIO;}
                else if (a == 'Citizen Journalism') {var u = Citizen;}
                else if (a == 'JELAJAH DESA') {var u = JELAJAHDESA;}
                else if (a == 'WISATA BUDAYA') {var u = WISATABUDAYA;}
                else if (a == 'SHOLAWAT THIBBIL QULUB') {var u = SHOLAWAT;}
                else if (a == 'Radio Bintang Tenggara') {var u = RadioBintangTenggara;}
                else if (a == 'Alffy Rev') {var u = AlffyRev;}
                else if (a == 'Ajeng') {var u = Ajeng;}
                else if (a == 'Agnes Monica') {var u = Agnes_Monica;}
                else if (a == 'INNA Ft Yandel') {var u = INNA_Ft_Yandel;}
                else if (a == 'SOLUSI SEHAT') {var u = SOLUSI_SEHAT;}
                else if (a == 'ARI LASSO') {var u = Ari_Lasso;}
                else if (a == 'Gracie Abrams') {var u = Gracie_Abrams;}
                else if (a == 'Andmesh') {var u = Andmesh;}
                else if (a == 'Dewa 19 Ft Virzha') {var u = Dewa_19_Ft_Virzha;}
                else if (a == 'Dewa 19 Ft Ello') {var u = Dewa_19_Ft_Ello;}
                else if (a == 'Fadly Ft Natasha') {var u = Fadly_Ft_Natasha;}
                else if (a == 'T.R.I.A.D') {var u = TRIAD;}
                else if (a == 'Kotak') {var u = Kotak;}
                else if (a == 'Kirana Setio') {var u = Kirana_Setio;}
                else if (a == 'Alma Esbeye') {var u = Alma_Esbeye;}
                else if (a == 'TAHUKAH ANDA') {var u = TAHUKAH_ANDA;}
                else if (a == 'Alfina Nindiyani') {var u = Alfina_Nindiyani;}
                else if (a == 'OPENING') {var u = OPENING;}
                else if (a == 'TS MAGHRIB') {var u = TS_MAGHRIB;}
                else if (a == 'GALANG SANUBARI') {var u = Galang_Sanubari;}
                else if (a == 'SARAH SOFYAN') {var u = Sarah_Sofyan;}
                else if (a == 'ZEFYA RANI') {var u = Zefya_Rani;}
                else if (a == 'RIMA INDAH') {var u = Rima_Indah;}
                else if (a == 'OKKI NILA') {var u = Okki_Nila;}
                else if (a == 'ANITA SUMARDI') {var u = Anita_Sumardi;}
                else if (a == 'NURUL HIDAYAH') {var u = Nurul_Hidayah;}
                else if (a == 'CLOSING') {var u = CLOSING;}
                else if (a == 'Alda Risma') {var u = Alda_Risma;}
                else if (a == 'PERISTIWA HARI INI') {var u = PERISTIWA_HARI_INI;}
                else if (a == 'BMKG') {var u = BMKG;}  
                else if (a == 'Mayang Sari') {var u = Mayang_Sari;}
                else if (a == 'Samsons') {var u = Samsons;}
                else if (a == 'Daeng syawal mubarok') {var u = Daeng_syawal_mubarok;}
                else if (a == 'TANDA WAKTU SHOLAT ISYA') {var u = TANDA_WAKTU_SHOLAT_ISYA;}
                else if (a == 'Anisa Rahman') {var u = Anisa_Rahman;}
                else if (a == 'Anggun') {var u = Anggun;}
                else if (a == 'Power Slaves') {var u = Power_Slaves;}
                else if (a == 'Second Civil') {var u = Second_Civil;}
                else if (a == 'Ismi Azis') {var u = Ismi_Azis;}
                else if (a == 'IKLAN') {var u = IKLAN;}
                else if (a == 'Station Offline') {var u = Station_Offline;}
                else {var u = ta;}    
                for (b = 0; b < d; b++) a = a.replace(wa[b], ""), c = c.replace(wa[b], "");
                b = M[x] + "https://itunes.apple.com/search?type=jsonp&term=" + encodeURI(a) + " " + encodeURI(c) + "&media=music&limit=1";
                a = new XMLHttpRequest;
                a.onreadystatechange = function () {
                    if (4 === this.readyState)
                        if (200 === this.status) {
                            var a = JSON.parse(this.responseText);
                            a = a.resultCount ? a.results[0].artworkUrl100 : u;
                            q[w] && (q[w].thumb = a, D())
                        } else 403 === this.status && q[w] && (x++, x > M.length - 1 && (x = 0), D())
                };
                a.open("GET", b, !0);
                a.send();
                window.artworkDataXHR =
                    a
            } else D()
        }

        function va(a) {
            xa.empty();
            var c, b = a.length,
                e;
            for (c = 0; c < b; c++) {
                var g = a[c];
                var h = d('<div class="mrp-playlist-item"/>');
                if ((e = g.thumb || u) && !0 !== e) {
                    var k = new Image;
                    k.className = "mrp-playlist-thumb-img";
                    k.onload = function () {
                        this.className += " mrp-visible"
                    };
                    k.src = e;
                    d('<span class="mrp-playlist-thumb"></span>').append(k).appendTo(h)
                }
                e = d('<span class="mrp-playlist-info"></span>').appendTo(h);
                g = fb.replace("%title%", g.title).replace("%artist%", g.artist);
                d(g).appendTo(e);
                h.appendTo(xa)
            }
            Pa && !Qa && (Qa = !0, X(da))
        }

        function gb() {
            var a, c, b, e, g, h;
            ea.find(".mrp-playlist").each(function () {
                a = d(this);
                c = d('<div class="mrp-playlist-item"/>').on("click", function () {
                    if (S) return !1;
                    var a = d(this);
                    if (a.hasClass("mrp-playlist-item-active")) return !1;
                    fa && fa.removeClass("mrp-playlist-item-active");
                    fa = a.addClass("mrp-playlist-item-active");
                    setTimeout(function () {
                        ya.click()
                    }, 500);
                    na(a)
                });
                var f = a.attr("data-radio-thumb");
                if (f) {
                    var k = new Image;
                    k.className = "mrp-playlist-thumb-img";
                    k.onload = function () {
                        this.className += " mrp-visible"
                    };
                    k.src = f;
                    d('<span class="mrp-playlist-thumb"></span>').append(k).appendTo(c)
                }
                e = d('<span class="mrp-playlist-info"></span>').appendTo(c);
                b = a.attr("data-radio-title") || "";
                g = hb.replace("%title%", b);
                d(g).appendTo(e);
                h = a.prop("attributes");
                d.each(h, function () {
                    "id" != this.name && "class" != this.name && (c.attr(this.name, this.value), "data-mrp-playlist-item-active" == this.name && (fa = c.addClass("mrp-playlist-item-active").removeAttr("data-mrp-playlist-item-active")))
                });
                c.appendTo(ib)
            });
            Pa && !za && (za = !0, X(Aa))
        }

        function ba(a) {
            Ra.html(a.title);
            Sa.html(a.artist);
            if (!C)
                if (u) a.thumb = u;
                else return;
            var c = a.thumb;
            if (c && (Ja = c = c == u && ta ? ta : c.replace("100x100bb", b.playerArtworkSize), ha.hasClass("mrp-thumb-hidden") ? ha.css("background-image", "url(" + c + ")").removeClass("mrp-thumb-hidden") : (Ta.css("background-image", "url(" + c + ")").removeClass("mrp-thumb-hidden"), ha.addClass("mrp-thumb-hidden")), "mediaSession" in navigator)) {
                c = a.thumb != u ? a.thumb.replace("100x100bb", "96x96bb") : u;
                var d = a.thumb != u ? a.thumb.replace("100x100bb", "128x128bb") : u,
                    e = a.thumb != u ? a.thumb.replace("100x100bb", "192x192bb") : u,
                    g = a.thumb != u ? a.thumb.replace("100x100bb", "256x256bb") : u,
                    h = a.thumb != u ? a.thumb.replace("100x100bb", "384x384bb") : u;
                navigator.mediaSession.metadata = new MediaMetadata({
                    title: a.title,
                    artist: a.artist,
                    artwork: [{
                        src: c,
                        sizes: "96x96",
                        type: "image/png"
                    }, {
                        src: d,
                        sizes: "128x128",
                        type: "image/png"
                    }, {
                        src: e,
                        sizes: "192x192",
                        type: "image/png"
                    }, {
                        src: g,
                        sizes: "256x256",
                        type: "image/png"
                    }, {
                        src: h,
                        sizes: "384x384",
                        type: "image/png"
                    }, {
                        src: h,
                        sizes: "512x512",
                        type: "image/png"
                    }]
                })
            }
        }

        function Na() {
            Ua || (T = d(document.createElement("audio")).attr("preload",
                jb), h = T[0], Ua = !0);
            Ba = k.radio;
            k.mountpoint && (Ba += k.mountpoint);
            h.src = Ba;
            T.on("ended", function () {}).on("canplay", function (a) {}).on("canplaythrough", function (a) {}).on("loadedmetadata", function () {
                k.playbackRate && (h.playbackRate = Number(k.playbackRate))
            }).on("play", function () {
                Ca || (Ca = !0, d(p).trigger("soundStart", {
                    instance: p,
                    instanceName: N,
                    radioData: G
                }));
                if (kb && 1 < mrp_mediaArr.length) {
                    var a, b = mrp_mediaArr.length;
                    for (a = 0; a < b; a++) p != mrp_mediaArr[a].inst && mrp_mediaArr[a].inst.pauseMedia()
                }
                I.find(".mrp-play-icon").hide();
                I.find(".mrp-pause-icon").show();
                O = !0;
                d(p).trigger("soundPlay", {
                    instance: p,
                    instanceName: N,
                    radioData: G
                })
            }).on("pause", function () {
                I.find(".mrp-play-icon").show();
                I.find(".mrp-pause-icon").hide();
                O = !1;
                d(p).trigger("soundPause", {
                    instance: p,
                    instanceName: N,
                    radioData: G
                })
            }).on("error", function (a) {
                console.log(a);
                d(p).trigger("soundError", {
                    instance: p,
                    instanceName: N,
                    error: a
                })
            });
            if (ia) {
                var a = h.play();
                void 0 !== a && a.then(function () {})["catch"](function (a) {})
            }
            h.volume = g;
            ia = !0;
            "shoutcast" == v ? qa() : "icecast" == v && aa()
        }

        function Va() {
            r && clearInterval(r);
            r = null;
            h && (h.pause(), h.src = "");
            T && T.off("ended canplay canplaythrough loadedmetadata pause play error");
            Ra.html("");
            Sa.html("");
            Ta.css("background-image", "none").addClass("mrp-thumb-hidden");
            ha.css("background-image", "none").addClass("mrp-thumb-hidden");
            v = G = null;
            Ca = O = !1;
            I.find(".mrp-play-icon").show();
            I.find(".mrp-pause-icon").hide()
        }

        function La() {
            window.radioXHR && (window.radioXHR.abort(), delete window.radioXHR);
            window.radioDataXHR && (window.radioDataXHR.abort(), delete window.radioDataXHR);
            window.artworkDataXHR && (window.artworkDataXHR.abort(), delete window.artworkDataXHR);
            v && Va();
            x = 0;
            xa.empty();
            L = null;
            l = []
        }

        function cb(a) {
            var c = {};
            void 0 != a.attr("data-type") && (c.type = a.attr("data-type"));
            void 0 != a.attr("data-radio-url") && (c.radio = a.attr("data-radio-url"), "icecast" == c.type && (c.mountpoint = c.radio.substr(c.radio.lastIndexOf("/") + 1), c.radio = c.radio.substr(0, c.radio.lastIndexOf("/") + 1)));
            void 0 != a.attr("data-version") && (c.version = a.attr("data-version"));
            return c
        }
        d(this).hasClass("mrp-fixed")
            && d(this).appendTo(d("body")).css("opacity", 1);
        var e = d(this),
            ib = e.find(".mrp-playlist-content"),
            Aa = e.find(".mrp-playlist-inner"),
            xa = e.find(".mrp-history-content"),
            da = e.find(".mrp-history-inner"),
            lb = e.find(".mrp-popup-toggle"),
            Ta = e.find(".mrp-player-thumb1"),
            ha = e.find(".mrp-player-thumb2"),
            Ra = e.find(".mrp-player-title"),
            Sa = e.find(".mrp-player-artist"),
            I = e.find(".mrp-playback-toggle"),
            oa = e.find(".mrp-preloader"),
            ya = e.find(".mrp-history-title").on("click", function () {
                if (!n || d(this).hasClass("mrp-title-active")) return !1;
                da.css({
                    transform: "translateX(0px)"
                });
                Aa.css({
                    transform: "translateX(0)"
                });
                ya.addClass("mrp-title-active");
                Wa.removeClass("mrp-title-active")
            }),
            Wa = e.find(".mrp-station-title").on("click", function () {
                if (!n || d(this).hasClass("mrp-title-active")) return !1;
                da.css({
                    transform: "translateX(-100%)"
                });
                Aa.css({
                    transform: "translateX(-100%)"
                });
                ya.removeClass("mrp-title-active");
                Wa.addClass("mrp-title-active")
            });
        b = d.extend(!0, {}, {
            playlistList: "#mrp-playlist-list",
            volume: .5,
            preload: "auto",
            togglePlaybackOnMultipleInstances: !0,
            useKeyboardNavigationForPlayback: !1,
            scrollOrientation: "vertical",
            scrollTheme: "minimal",
            cors: "https://cors.mediastreaming.it/",
            getPlayerArtwork: !0,
            getHistoryArtwork: !1,
            createHistoryList: !0,
            playerArtworkSize: "384x384bb",
            instanceName: "player" + Math.floor(1E6 * Math.random()),
            historyTitleMarkup: '<span class="mrp-playlist-title">%title%</span><span class="mrp-playlist-artist">%artist%</span>',
            playlistTitleMarkup: '<span class="mrp-playlist-title">%title%</span>',
            defaultHistoryArtwork: "data/default_artwork/star_small.png",
            defaultPlayerArtwork: "data/default_artwork/star.png",
            defaultSongTitle: "...",
            defaultSongArtist: "...",
            useCorsForAudio: !1,
            enableCors: !1
        }, b);
        var R = MRPUtils.isMobile();
        MRPUtils.hasLocalStorage();
        var ea = d(b.playlistList),
            ma = b.sourcePath,
            N = b.instanceName,
            ia = b.autoPlay,
            jb = b.preload,
            Pa = b.useScroll,
            bb = b.scrollOrientation,
            mb = b.useKeyboardNavigationForPlayback,
            Xa = b.facebookAppId,
            g = b.volume,
            M = b.cors.split(",").map(function (a) {
                return a.trim()
            }),
            kb = b.togglePlaybackOnMultipleInstances,
            C = b.getPlayerArtwork,
            ta = b.defaultPlayerArtwork,
            eb = b.defaultSongTitle,
            db = b.defaultSongArtist,
            sa = b.getHistoryArtwork,
            u = b.defaultHistoryArtwork,
            Y = b.createHistoryList,
            Oa = b.createHistoryListAsItPlays,
            fb = b.historyTitleMarkup,
            hb = b.playlistTitleMarkup,
            p = this;
        d("body");
        var Ia = d(window),
            P = d(document);
        MRPUtils.isIOS();
        MRPUtils.isAndroid();
        var nb = MRPUtils.isChrome(),
            ob = MRPUtils.isSafari(),
            Ka = "http:" == window.location.protocol ? "http:" : "https:",
            pb = MRPUtils.volumeCanBeSet(),
            Ua, T, h, G, L, z, Ja, Qa, za, l = [],
            q = [],
            w, K, r,
            Z = b.lastPlayedInterval,
            ua = ["/status-json.xsl", "/status.xsl"],
            ca = 0,
            Ca, v, Ba, O, k, pa, S = !0,
            fa, wa = ["feat.", "ft.", "Feat.", "Ft."],
            x = 0;
        "undefined" === typeof window.mrp_mediaArr && (window.mrp_mediaArr = []);
        window.mrp_mediaArr.push({
            inst: p,
            id: N
        });
        if (ia && !MRPUtils.iFrame && (nb || ob) && !R) {
            var qb = MRPUtils.qualifyURL(ma + "");
            MRPUtils.iFrame = d('<iframe src="' + qb + '" allow="autoplay" style="display:none"></iframe>').appendTo("body");
            var Ma = !0
        }
        R && (ia = !1);
        MRPUtils.isEmpty(Xa) || "file:" == window.location.protocol
            ? console.log("facebookAppId has not been set in settings!") : Fa(Xa);
        var t = e.find(".mrp-tooltip");
        R || ("static" == e.css("position") && console.log("wrapper css position is static, therefore tooltip might not work correctly. Please set wrapper css to other than static."), e.on("mouseenter", "[data-tooltip]", function (a) {
            var c = d(this);
            a = e[0].getBoundingClientRect();
            var b = c[0].getBoundingClientRect();
            t.text(c.attr("data-tooltip"));
            var g = parseInt(b.top - a.top - t.outerHeight());
            c = parseInt(b.left - a.left - t.outerWidth()
                / 2 + c.outerWidth() / 2);
            c + t.outerWidth() > e.width() ? c = e.width() - t.outerWidth() : 0 > c && (c = 0);
            0 > g + a.top && (g = parseInt(b.top - a.top + t.outerHeight() + 15));
            t.css({
                left: c + "px",
                top: g + "px"
            }).show()
        }).on("mouseleave", "[data-tooltip]", function (a) {
            t.hide()
        }));
        if ("ontouchstart" in window) {
            var Da = "touchstart.ap mousedown.ap";
            var J = "touchmove.ap mousemove.ap";
            var V = "touchend.ap mouseup.ap"
        } else window.PointerEvent ? (Da = "pointerdown.ap", J = "pointermove.ap", V = "pointerup.ap") : (Da = "mousedown.ap", J = "mousemove.ap", V = "mouseup.ap");
        var la = .5,
            U, Q = e.find(".mrp-volume-toggle"),
            y = e.find(".mrp-volume-seekbar"),
            A = e.find(".mrp-volume-bg"),
            $a = e.find(".mrp-volume-level"),
            F = void 0 != y.attr("data-is-vertical") ? !0 : !1,
            B = F ? A.height() : A.width();
        0 > g ? g = 0 : 1 < g && (g = 1);
        0 != g && (la = g);
        if (pb) y.on(Da, function (a) {
            Za(a);
            return !1
        });
        else Q.remove();
        if (!R) {
            var ja = function () {
                y.off(J, Ha).off("mouseout", ja);
                P.off("mouseout", ja);
                t.hide()
            };
            y.on("mouseover", function () {
                y.on(J, Ha).on("mouseout", ja);
                P.on("mouseout", ja)
            })
        }
        mb && P.keyup(function (a) {
            if (!n) return !1;
            var c =
                a.keyCode;
            d(a.target);
            32 == c ? (p.togglePlayback(), a.preventDefault()) : 77 == c && E()
        });
        var Ya = [e.find(".mrp-share-item"), lb, I, e.find(".mrp-volume-btn")],
            rb = Ya.length,
            ka;
        for (ka = 0; ka < rb; ka++) d(Ya[ka]).css("cursor", "pointer").on("click", ab);
        this.playMedia = function () {
            if (!n || !v || O) return !1;
            if (h) {
                h.load();
                var a = h.play();
                void 0 !== a && a.then(function () {})["catch"](function (a) {})
            }
        };
        this.pauseMedia = function () {
            if (!n || !v || !O) return !1;
            h && h.pause()
        };
        this.togglePlayback = function () {
            if (!n || !v) return !1;
            if (h)
                if (h.paused) {
                    h.load();
                    var a = h.play();
                    void 0 !== a && a.then(function () {})["catch"](function (a) {})
                } else h.pause()
        };
        this.destroyInstance = function () {
            window.radioXHR && (window.radioXHR.abort(), delete window.radioXHR);
            window.radioDataXHR && (window.radioDataXHR.abort(), delete window.radioDataXHR);
            window.artworkDataXHR && (window.artworkDataXHR.abort(), delete window.artworkDataXHR);
            y && y.off();
            Va();
            "undefined" !== typeof mCustomScrollbar && da.mCustomScrollbar("destroy");
            za = !1
        };
        this.destroyPlaylist = function () {
            if (!n) return !1;
            La()
        };
        this.loadPlaylist =
            function (a) {
                if (!n || S) return !1;
                if ("undefined" === typeof a || MRPUtils.isEmpty(a)) return alert("loadPlaylist method requires id parameter. loadPlaylist failed."), !1;
                if (pa == a) return !1;
                a = ea.find(d(a));
                if (0 == a.length) return alert("Failed playlist selection! Playlist - " + b.activePlaylist + " does not exist. Check activePlaylist option in settings!"), !1;
                na(a)
            };
        this.openPopup = function () {
            if (!n) return !1;
            if ("function" === typeof mrpOpenPopup) mrpOpenPopup(p, b);
            else {
                var a = document.createElement("script");
                a.type = "text/javascript";
                a.src = MRPUtils.qualifyURL(ma + "js/popup.js?35");
                a.onload = a.onreadystatechange = function () {
                    this.readyState && "complete" != this.readyState || mrpOpenPopup(p, b)
                };
                a.onerror = function () {
                    alert("Error loading " + this.src)
                };
                var c = document.getElementsByTagName("script")[0];
                c.parentNode.insertBefore(a, c)
            }
        };
        this.getRadioData = function () {
            return n ? G : !1
        };
        this.getPlaylistLoading = function () {
            return S
        };
        this.setPlaybackRate = function (a) {
            if (!n || !v) return !1;
            h && (h.playbackRate = Number(a))
        };
        this.setVolume = function (a) {
            if (!n) return !1;
            0 > a ? a = 0 : 1 < a && (a = 1);
            W(a)
        };
        this.getVolume = function () {
            return g
        };
        this.toggleMute = function () {
            if (!n) return !1;
            E()
        };
        this.getSetupDone = function () {
            return n
        };
        this.getMediaPlaying = function () {
            return n ? O : !1
        };
        this.getWrapper = function () {
            return e
        };
        this.getPlaylistList = function () {
            return ea
        };
        this.getSettings = function () {
            return b
        };
        var n = !0;
        d(p).trigger("setupDone", {
            instance: p,
            instanceName: N
        });
        if (b.activePlaylist) {
            var Ea = ea.find(d(b.activePlaylist));
            0 == Ea.length && alert("Failed playlist selection! Playlist - " + b.activePlaylist
                + " does not exist. Check activePlaylist option in settings!");
            Ea.attr("data-mrp-playlist-item-active", 1);
            na(Ea)
        }
        b.createRadioList && gb();
        return this
    }
})(jQuery);
(function (d) {
    var b = function () {};
    b.isEmpty = function (b) {
        return 0 == b.replace(/^\s+|\s+$/g, "").length
    };
    b.isNumber = function (b) {
        return !isNaN(parseFloat(b)) && isFinite(b)
    };
    b.isMobile = function () {
        return /Android|webOS|iPhone|iPad|iPod|sony|BlackBerry/i.test(navigator.userAgent)
    };
    b.isIE = function () {
        var b = -1;
        if ("Microsoft Internet Explorer" == navigator.appName) {
            var d = navigator.userAgent,
                E = /MSIE ([0-9]{1,}[.0-9]{0,})/;
            null != E.exec(d) && (b = parseFloat(RegExp.$1))
        } else "Netscape" == navigator.appName && (d = navigator.userAgent,
            E = /Trident\/.*rv:([0-9]{1,}[.0-9]{0,})/, null != E.exec(d) && (b = parseFloat(RegExp.$1)));
        return -1 != b ? !0 : !1
    };
    b.isIOS = function () {
        return navigator.userAgent.match(/(iPad|iPhone|iPod)/g)
    };
    b.isAndroid = function () {
        return -1 < navigator.userAgent.indexOf("Android")
    };
    b.qualifyURL = function (b) {
        var d = document.createElement("a");
        d.href = b;
        return d.href
    };
    b.relativePath = function (b) {
        return /^(?:[a-z]+:)?\/\//i.test(b)
    };
    b.hasLocalStorage = function () {
        try {
            return "localStorage" in d && null !== d.localStorage
        } catch (Fa) {
            return !1
        }
    };
    b.isChrome =
        function () {
            return !!d.chrome && (!!d.chrome.webstore || !!d.chrome.runtime)
        };
    b.isSafari = function () {
        return 0 < Object.prototype.toString.call(d.HTMLElement).indexOf("Constructor")
    };
    b.volumeCanBeSet = function () {
        var b = document.createElement("audio");
        if (!b) return !1;
        b.volume = 0;
        return 0 == b.volume ? !0 : !1
    };
    d.MRPUtils = b
})(window);
