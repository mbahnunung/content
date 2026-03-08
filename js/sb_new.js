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
  d.fn.mrp = function (c) {
    function Qa(a) {
      (function (a, h, f) {
        var b = a.getElementsByTagName(h)[0];
        a.getElementById(f) || (a = a.createElement(h), a.id = f, a.src = "https//connect.facebook.net/en_US/sdk.js", b.parentNode.insertBefore(a, b))
      })(document, "script", "facebook-jssdk");
      window.fbAsyncInit = function () {
        FB.init({
          appId: a,
          xfbml: !0,
          version: "v2.9"
        })
      }
    }

    function kb(a) {
      if (t) {
        if (!ja) {
          if ("touchstart" == a.type) {
            if (a = a.originalEvent.touches, !(a && 0 < a.length)) return !1
          } else a.preventDefault();
          ja = !0;
          Z.on(T, function (a) {
            a: {
              if ("touchmove"
                == a.type) {
                if (a.originalEvent.touches && a.originalEvent.touches.length) var b = a.originalEvent.touches;
                else if (a.originalEvent.changedTouches && a.originalEvent.changedTouches.length) b = a.originalEvent.changedTouches;
                else break a;
                if (1 < b.length) break a;
                b = b[0]
              } else b = a;a.preventDefault();Sa(b)
            }
          }).on(ka, function (a) {
            a: if (ja) {
              ja = !1;
              Z.off(T).off(ka);
              if ("touchend" == a.type) {
                if (a.originalEvent.touches && a.originalEvent.touches.length) var b = a.originalEvent.touches;
                else if (a.originalEvent.changedTouches && a.originalEvent.changedTouches.length) b =
                  a.originalEvent.changedTouches;
                else break a;
                if (1 < b.length) break a;
                b = b[0]
              } else b = a;
              a.preventDefault();
              Sa(b)
            }
          })
        }
        return !1
      }
    }

    function P() {
      if (!t) return !1;
      0 < p ? (Ba = p, p = 0) : p = Ba;
      la()
    }

    function Sa(a) {
      Q ? (p = Math.max(0, Math.min(1, (a.pageY - J.offset().top) / K)), p = 1 - p) : p = Math.max(0, Math.min(1, (a.pageX - J.offset().left) / K));
      la()
    }

    function la(a) {
      "undefined" !== typeof a && (p = a);
      n && (n.volume = p);
      a = Q ? "height" : "width";
      MRPUtils.isNumber(K) || (K = Q ? J.height() : J.width());
      lb.css(a, p * K + "px");
      0 == p ? (aa.find(".mrp-volume-icon").hide(),
        aa.find(".mrp-mute-icon").show()) : (aa.find(".mrp-volume-icon").show(), aa.find(".mrp-mute-icon").hide())
    }

    function Ta(a) {
      var b = Q ? a.pageY - J.offset().top : a.pageX - J.offset().left;
      0 > b ? b = 0 : b > K && (b = K);
      b = Math.max(0, Math.min(1, b / K));
      if (!MRPUtils.isNumber(b)) return !1;
      Q && (b = 1 - b);
      b = parseInt(100 * b, 10);
      w.text(b + " %");
      b = e[0].getBoundingClientRect();
      var h = F[0].getBoundingClientRect();
      if (Q) {
        var f = parseInt(h.left - b.left - w.outerWidth() / 2 + F.outerWidth() / 2);
        a = parseInt(a.pageY - Ua.scrollTop() - b.top - w.outerHeight() - 10)
      } else f =
        parseInt(a.pageX - Ua.scrollLeft() - b.left - w.outerWidth() / 2), a = parseInt(h.top - b.top - w.outerHeight());
      0 > a + b.top && (a = parseInt(h.top - b.top + w.outerHeight() + 15));
      w.css({
        left: f + "px",
        top: a + "px"
      }).show()
    }

    function mb(a) {
      if (!t) return !1;
      a = d(a.currentTarget);
      a.hasClass("mrp-playback-toggle") && k.togglePlayback();
      if (a.hasClass("mrp-prev-toggle"))
        if (ba) {
          var b = D ? D.attr("data-id") : 0;
          b--;
          0 > b && (b = U - 1);
          E.find(".mrp-playlist-item[data-id=" + b + "]").click()
        } else c.activeRadioStationIndex--, 0 > c.activeRadioStationIndex && (c.activeRadioStationIndex =
          U - 1), ca(ma[c.activeRadioStationIndex]);
      if (a.hasClass("mrp-next-toggle")) ba ? (b = D ? D.attr("data-id") : 0, b++, b > U - 1 && (b = 0), E.find(".mrp-playlist-item[data-id=" + b + "]").click()) : (c.activeRadioStationIndex++, c.activeRadioStationIndex > U - 1 && (c.activeRadioStationIndex = 0), ca(ma[c.activeRadioStationIndex]));
      else if (a.hasClass("mrp-volume-toggle")) da && void 0 == a.attr("data-toggle-mute") || P();
      else if (a.hasClass("mrp-popup-toggle")) k.openPopup();
      else if (a.hasClass("mrp-playlist-toggle")) k.togglePlaylist();
      else if (a.hasClass("mrp-share-item")) a: {
        a =
        a.attr("data-type").toLowerCase();b = (window.screen.width - 600) / 2;
        var h = (window.screen.height - 300) / 2,
          f = r || "",
          Ra = l.description || "",
          na = Va || "",
          e = l.share || window.location.href;MRPUtils.relativePath(na) || (na = MRPUtils.qualifyURL(na));
        if ("facebook" == a) window.FB && FB.ui({
          method: "share_open_graph",
          action_type: "og.shares",
          action_properties: JSON.stringify({
            object: {
              "og:url": e,
              "og:title": f,
              "og:description": Ra,
              "og:image": na
            }
          })
        });
        else if ("twitter" == a) var g = Wa + "//twitter.com/share?url=" + encodeURIComponent(e) + "&text="
          + encodeURIComponent(f);
        else if ("tumblr" == a) g = Wa + "//www.tumblr.com/share/link?url=" + encodeURIComponent(e) + "&amp;name=" + encodeURIComponent(f) + "&amp;description=" + encodeURIComponent(Ra);
        else if ("whatsapp" == a)
          if (da) {
            g = encodeURIComponent(f) + " - " + encodeURIComponent(e);
            window.location.href = "whatsapp://send?text=" + g;
            break a
          } else alert(c.whatsAppWarning);g && window.open(g, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=600,height=300,left=" + b + ",top=" + h)
      }
    }

    function oa(a) {
      if ("undefined" === typeof mCustomScrollbar)
        if (window.playlistScrollLoading) var b =
          setInterval(function () {
            playlistScrollLoading || (clearInterval(b), oa(a))
          }, 100);
        else {
          window.playlistScrollLoading = !0;
          var h = document.createElement("script");
          h.type = "text/javascript";
          h.src = MRPUtils.qualifyURL(Xa + "https://warningfm.github.io/v3/js/jquery.mCustomScrollbar.concat.min.js");
          h.onload = h.onreadystatechange = function () {
            this.readyState && "complete" != this.readyState || (oa(a), window.playlistScrollLoading = !1)
          };
          h.onerror = function () {
            alert("Error loading " + this.src)
          };
          var f = document.getElementsByTagName("script")[0];
          f.parentNode.insertBefore(h,
            f)
        }
      else a.mCustomScrollbar({
        axis: "horizontal" == nb ? "x" : "y",
        theme: c.scrollTheme,
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

    function ca(a) {
      pa = !0;
      qa.show();
      Ca && Ya();
      c.activeRadioStationIndex = a.index();
      Ca = a;
      var b = {};
      void 0 != a.attr("data-type")
        && (b.type = a.attr("data-type"));
      void 0 != a.attr("data-radio-url") && (b.radio = a.attr("data-radio-url"), "icecast" == b.type || "radiojar" == b.type) && (b.mountpoint = b.radio.substr(b.radio.lastIndexOf("/") + 1), b.radio = b.radio.substr(0, b.radio.lastIndexOf("/") + 1));
      void 0 != a.attr("data-version") && (b.version = a.attr("data-version"));
      void 0 != a.attr("data-sid") && (b.sid = a.attr("data-sid"));
      b.playbackRate = 1;
      void 0 != a.attr("data-playback-rate") && (b.playbackRate = a.attr("data-playback-rate"));
      void 0 != a.attr("data-share")
        && (b.share = a.attr("data-share"));
      l = b;
      x = l.type;
      la(p);
      ob()
    }

    function Da() {
      var a = l.radio;
      ";" == a.substring(a.length - 1) && (a = a.substring(0, a.length - 1));
      "/" == a.substring(a.length - 1) && (a = a.substring(0, a.length - 1));
      if (c.enableCors) {
        window.radioDataXHR && window.radioDataXHR.abort();
        var b = new XMLHttpRequest;
        b.onerror = function (a) {};
        b.onreadystatechange = function () {
          if (4 === this.readyState)
            if (200 === this.status) {
              if (l.version && 1 == l.version) var a = b.responseText.split(","),
                h = a[6];
              else a = JSON.parse(b.responseText), h = a.songtitle;
              G = a;
              if (H) r ? r != h && ea() : ea();
              else {
                var c = h.split("-");
                a = d.trim(c[0]);
                c = d.trim(c[1]);
                g = [];
                y = -1;
                g.push({
                  artist: a,
                  title: c,
                  thumb: v
                });
                u = 1;
                r ? r != h && (v ? A() : B()) : v ? A() : B()
              }
              r = h
            } else L || (m && clearInterval(m), m = setInterval(function () {
              Da()
            }, V))
        };
        if (l.version && 1 == l.version) b.open("GET", I[C] + a + "/7.html", !0);
        else {
          var h = l.sid || "1";
          b.open("GET", I[C] + a + "/stats?sid=" + h + "&json=1", !0)
        }
        b.send();
        window.radioDataXHR = b
      } else h = l.sid || "1", d.ajax({
        dataType: "jsonp",
        url: a + "/stats?sid=" + h + "&json=1",
        success: function (a) {
          var b = a.songtitle;
          G = a;
          if (H) r ? r != b && ea() : ea();
          else {
            var f = a.songtitle.split("-");
            a = d.trim(f[0]);
            f = d.trim(f[1]);
            g = [];
            y = -1;
            g.push({
              artist: a,
              title: f,
              thumb: v
            });
            u = 1;
            r ? r != b && (v ? A() : B()) : v ? A() : B()
          }
          r = b
        },
        error: function () {
          console.log("Error getShoutcastData")
        }
      })
    }

    function ea() {
      g = [];
      y = -1;
      var a = l.radio;
      ";" == a.substring(a.length - 1) && (a = a.substring(0, a.length - 1));
      if (c.enableCors) {
        window.radioXHR && window.radioXHR.abort();
        var b = new XMLHttpRequest;
        b.onerror = function (a) {};
        b.onreadystatechange = function () {
          if (4 === this.readyState)
            if (200
              === this.status) {
              var a = b.responseText,
                f = a.indexOf("Song Title") + 12;
              a = a.substr(f, a.length);
              a = a.split("</td><td>");
              a.shift();
              var c;
              u = a.length;
              11 < u && (u = 11);
              ra && (u = 1);
              for (c = 0; c < u; c++) {
                f = a[c].indexOf("</");
                a[c] = a[c].substr(0, f);
                a[c] = a[c].replace(/<\/?[^>]+(>|$)/g, "");
                var d = a[c].split(" - ");
                f = d[0].trim();
                d = d[1] ? d[1].trim() : ""; - 1 < d.indexOf("Current Song") && (d = d.substr(0, d.length - 12));
                0 == c ? g.push({
                  artist: f,
                  title: d,
                  thumb: v
                }) : g.push({
                  artist: f,
                  title: d,
                  thumb: M
                })
              }
              v || M ? A() : B()
            } else L || (m && clearInterval(m), m = setInterval(function () {
                ea()
              },
              V))
        };
        b.open("GET", I[C] + a + "played.html");
        b.send();
        window.radioXHR = b
      } else d.ajax({
        dataType: "jsonp",
        url: a + "played?sid=1&type=json&callback=?",
        success: function (a) {
          var b;
          u = a.length;
          11 < u && (u = 11);
          ra && (u = 1);
          for (b = 0; b < u; b++) {
            var h = a[b].title.split("-");
            var c = h[0].trim();
            h = h[1] ? h[1].trim() : "";
            0 == b ? g.push({
              artist: c,
              title: h,
              thumb: v
            }) : g.push({
              artist: c,
              title: h,
              thumb: M
            })
          }
          v || M ? A() : B()
        },
        error: function () {
          console.log("Error getShoutcastHistory")
        }
      })
    }

    function Ea() {
      window.radioDataXHR && window.radioDataXHR.abort();
      var a =
        new XMLHttpRequest;
      a.onerror = function (a) {};
      a.onreadystatechange = function () {
        if (4 === this.readyState)
          if (200 === this.status) {
            var b = JSON.parse(a.responseText),
              h = b.artist,
              f = b.title,
              c = h + " - " + f,
              d = b.thumb || null;
            G = b;
            g = [];
            y = -1;
            g.push({
              artist: h,
              title: f,
              thumb: v
            });
            u = 1;
            H ? r ? r != c && Fa() : Fa() : r ? r != c && (v && null == d ? A() : B()) : v && null == d ? A() : B();
            r = c
          } else L || (m && clearInterval(m), m = setInterval(function () {
            Ea()
          }, V))
      };
      a.open("GET", I[C] + ("http://www.radiojar.com/api/stations/" + l.mountpoint + "/now_playing/"), !0);
      a.send();
      window.radioDataXHR =
        a
    }

    function Fa() {
      y = -1;
      var a = l.radio;
      ";" == a.substring(a.length - 1) && (a = a.substring(0, a.length - 1));
      window.radioXHR && window.radioXHR.abort();
      var b = new XMLHttpRequest;
      b.onerror = function (a) {};
      b.onreadystatechange = function () {
        if (4 === this.readyState)
          if (200 === this.status) {
            var a = b.responseText,
              f = a.indexOf("[{");
            a = a.substr(f, a.length);
            a = JSON.parse(a);
            a.reverse();
            11 < a.length && (a = a.splice(0, 11));
            u = a.length - 1;
            ra && (u = 1);
            for (f = 0; f < u; f++) {
              var c = a[f].artist;
              var d = a[f].track;
              0 == f ? g.push({
                artist: c,
                title: d,
                thumb: v
              }) : g.push({
                artist: c,
                title: d,
                thumb: M
              })
            }
            v || M ? (u = g.length, A()) : B()
          } else L || (m && clearInterval(m), m = setInterval(function () {
            Fa()
          }, V))
      };
      b.open("GET", I[C] + ("http://www.radiojar.com/api/stations/" + l.mountpoint + "/tracks/"));
      b.send();
      window.radioXHR = b
    }

    function sa() {
      var a = l.radio;
      ";" == a.substring(a.length - 1) && (a = a.substring(0, a.length - 1));
      window.radioXHR && window.radioXHR.abort();
      var b = new XMLHttpRequest;
      b.onerror = function (a) {};
      b.onreadystatechange = function () {
        if (4 === this.readyState)
          if (200 === this.status) {
            if (-1 < this.responseText.indexOf('{"icestats":')) {
              var a =
                JSON.parse(this.responseText);
              if (void 0 === a.icestats.source.length) var b = a.icestats.source;
              else {
                var c, e = a.icestats.source.length;
                for (c = 0; c < e; c++)
                  if (0 <= a.icestats.source[c].listenurl.indexOf(l.mountpoint)) {
                    b = a.icestats.source[c];
                    break
                  }
              }
              G = b;
              if (b.yp_currently_playing) var k = b.yp_currently_playing;
              else a = b.artist, b = b.title, a && b ? k = a + "-" + b : b && (k = b)
            } else -1 < this.responseText.indexOf('class="streamdata"') ? -1 < this.responseText.indexOf("Mount Point /" + l.mountpoint) && (b = this.responseText.substr(this.responseText.indexOf("Mount Point /"
              + l.mountpoint)), b = b.substr(b.indexOf("Current Song:")), b = b.substr(b.indexOf('<td class="streamdata">') + 23), b = b.substr(0, b.indexOf("</td>")), MRPUtils.isEmpty(b) || (k = b)) : -1 < this.responseText.indexOf('class="streamstats"') && -1 < this.responseText.indexOf("Mount Point /" + l.mountpoint) && (b = this.responseText.substr(this.responseText.indexOf("Mount Point /" + l.mountpoint)), b = b.substr(b.indexOf("Currently playing:")), b = b.substr(b.indexOf('<td class="streamstats">') + 24), b = b.substr(0, b.indexOf("</td>")), MRPUtils.isEmpty(b)
              || (k = b));
            k ? (b = k.split("-"), a = d.trim(b[0]), b = d.trim(b[1]), g = [], y = -1, g.push({
              artist: a,
              title: b,
              thumb: !0
            }), u = 1, r ? r != k && (v ? A() : B()) : v ? A() : B(), r = k) : (fa({
              artist: Ga,
              title: Ha,
              thumb: ta
            }), qa.hide())
          } else 404 == this.status && "Not Found" == this.statusText ? (console.log(Ia[ua] + " does not exist!"), ua++, Ia[ua] ? L || (m && clearInterval(m), sa()) : (fa({
            artist: Ga,
            title: Ha,
            thumb: ta
          }), qa.hide())) : L || (m && clearInterval(m), m = setInterval(function () {
            sa()
          }, V))
      };
      b.open("GET", I[C] + a + Ia[ua], !0);
      b.send();
      window.radioXHR = b
    }

    function B() {
      qa.hide();
      C = 0;
      if ("shoutcast" == x || "radiojar" == x)
        if (ra) {
          var a = g.shift();
          fa(a);
          H && (0 == q.length ? q.push(a) : (q[0].artist == a.artist && q[0].title == a.title && q[0].thumb == a.thumb || q.unshift(a), 11 < q.length && q.pop(), 1 < q.length && Ja(q.slice(1))))
        } else fa(g.shift()), H && Ja(g);
      else "icecast" == x && (a = g.shift(), fa(a), H && (0 == q.length ? q.push(a) : (q[0].artist == a.artist && q[0].title == a.title && q[0].thumb == a.thumb || q.unshift(a), 11 < q.length && q.pop(), 1 < q.length && Ja(q.slice(1)))));
      L = !0;
      pa = !1;
      m && clearInterval(m);
      m = setInterval(function () {
        "shoutcast"
        == x ? Da() : "icecast" == x ? sa() : "radiojar" == x && Ea()
      }, V)
    }

    function A() {
      y++;
      if (y == u) B();
      else if (!M && 0 < y) B();
      else if (g[y].thumb) {
        var a = g[y].artist,
            b = g[y].title;
        const HAZAFIT = 'https://id-test-11.slatic.net/p/b3a25c4966350da984bc04983b527d6e.jpg';
        const Commercial_Break = "https://live.staticflickr.com/65535/53805955404_bc1c26a8c8_z.jpg";
        const Raisa = 'https://i.scdn.co/image/ab67616d0000b2738bd2fdd47fa594b1362682a9';
        const Della_Monica = 'https://i1.sndcdn.com/artworks-000691872055-4fze2e-t500x500.jpg';
        const Erina = 'https://i.ytimg.com/vi/1NTsu5MhbpA/sddefault.jpg';
        const Happy_Asmara = 'https://i1.sndcdn.com/artworks-a9HEa272aWLyZWJn-Q8aisA-t500x500.jpgg';
        const JINGLE = 'https://live.staticflickr.com/65535/53972560837_ea09aaf6f2_b.jpg';
        const JINGLESETELAHIKLAN = 'https://lastfm.freetls.fastly.net/i/u/770x0/4b910aad2337b3254673b4562e89bc4e.png';
        const BENTRAP = 'https://thumbs2.imgbox.com/9c/7c/NhSEFqAC_t.png';
        const ADZAN_DHUHUR = 'https://live.staticflickr.com/65535/53815587960_2ded7e8990_z.jpg';
        const ASHAR = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjAkb2u1BXZyewCrcabezpQsAP5OVlOJBW1bSR2VD3Ct497ubsePRslOC74TCSna3aKQoPo8j_oPsX0UZpC1Qau0-pztX0uH66cuxA2F017wwnoFXYauEwaJPiqLEjtepu4PH0xxwVVIXExDIRCw7yWREoGPxQ5pN-gLftIwtSJD7fcUOgeuGMtGAyR-RYu/s1600/uJr1nZIi_t.jpg';
        const ADZANMAGHRIB = 'https://i.scdn.co/image/ab67616d0000b2736e9736d44d30472e61dd7118';
        const OpeningRadio = 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/opening-soon-design-template-945288577483c2347c1f05bb83a2b7a2_screen.jpg?ts=1575470323';
        const JINGLE_PENUTUP = 'https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/ec/3f/64/ec3f643b-0ffd-eb61-9ccf-c8d2c027594f/3ad3589a-548e-4b13-970c-83a2937c7d5c.jpg/1200x1200bb.jpg';
        const BIO7 = 'https://thumbs2.imgbox.com/93/c9/TLJNKuAG_t.jpg';
        const AINUCARE = 'https://thumbs2.imgbox.com/87/d2/fBkEsB3E_t.jpg';
        const HAPRO = 'https://mms.img.susercontent.com/id-11134207-7rasd-m37ssycwwei7da_tn';
        const KH_ZAINUDDIN_MZ = 'https://play-lh.googleusercontent.com/lpYrYFiAhiFxcg5x70lCi8CevFxWpQznUxBG88JMGCMSR4bBbI9Hhjz5D4UhnRZzYF4';
        const Suara_Banyuwangi = 'https://warningfm.github.io/v3/img/sb-bl640.png';
        const AlffyRev  = 'https://i.scdn.co/image/ab67616d0000b273d0572746e75788f3a073899b';
        const Ajeng = 'https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/e5/47/cf/e547cfe3-f707-7175-9123-b640435f6a8c/cover.jpg/1200x1200bb.jpg';
        const Agnes_Monica = 'https://i.scdn.co/image/ab6761610000e5eb09160e5ffdc256e65713a8a9';
        const Anji = 'https://upload.wikimedia.org/wikipedia/commons/f/f6/ANJI.jpg';
        const LA_PRO = 'https://thumbs2.imgbox.com/97/a5/WcuY32BU_t.jpg';
        const Ari_Lasso = 'https://i.scdn.co/image/ab6761610000e5eb4e1ed336c3ff93a95fa44e14';
        const Muhamad_Handoyo = 'https://cdn4.mbahnunungonline.net/img/Handoyo.png';
        const Handoyo = 'https://cdn4.mbahnunungonline.net/img/Handoyo.png';
        const Andmesh = 'https://i1.sndcdn.com/artworks-000644192974-fr8aja-t500x500.jpg';
        const Dewa_19_Ft_Virzha = 'https://i.scdn.co/image/ab67616d0000b2734383e26d01a2dd18452b7b37';
        const Dewa_19_Ft_Ello = 'https://i.scdn.co/image/ab67616d0000b2730b591f8644a5a5106169a30a';
        const Rendra_Prasetyo = 'https://cdn4.mbahnunungonline.net/img/Rendra.png';
        const Rendra = 'https://cdn4.mbahnunungonline.net/img/Rendra.png';
        const EghaLatoya  = 'https://i1.sndcdn.com/artworks-000145717002-8rm80q-t500x500.jpg';
        const GamelAwan = 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/99/b5/ef/99b5ef28-8196-0307-dd64-d3defa86eb50/cover.jpg/1200x1200bb.png';
        const Cassandra = 'https://i1.sndcdn.com/artworks-NKrGa2evriMT-0-t500x500.jpg';
        const Dhika_Resta = 'https://cdn4.mbahnunungonline.net/img/Dhika.png';
        const Rozy = 'https://images2.imgbox.com/64/0e/V0L2UmSW_o.jpg';
        const Reny = 'https://cdns-images.dzcdn.net/images/cover/c4618c2ceba8781cb55443690a11c07d/1900x1900-000000-80-0-0.jpg';
        const O_NET = 'https://thumbs2.imgbox.com/20/2e/buhVO6pu_t.png';
        const ON_AIR = 'https://thumbs2.imgbox.com/86/fd/v7okGb6x_t.png';
        const ILM = 'https://warningfm.github.io/v3/img/33f0ac509ef2c3ef37a039fdf2108c4f50c32f0dc.png';
        const AlviAnanta = 'https://i1.sndcdn.com/artworks-000691852279-zhd4cw-t500x500.jpg';
        const Catur_Arum  = 'https://i1.sndcdn.com/artworks-000227858822-l8w6ww-t500x500.jpg'; 
        const Syahiba_Saufa_Ft_Shinta_Arsinta = 'https://i.scdn.co/image/ab67616d0000b2737dd4ba70910664a26fb1c7e0'; 
        const Lusiana = 'https://thumbs2.imgbox.com/da/bd/1aijXmkg_t.jpg'; 
        const Suliyana = 'https://i.scdn.co/image/ab67616d0000b2733e4c6986797db1877c5be37d';
        const Syahiba = 'https://i.scdn.co/image/ab67616d0000b27378fdcad5374c66bd8f7321c5'; 
        const TOP_NEWS = 'https://play-lh.googleusercontent.com/ddFW3W44VzPqYojvK4iEDsdbk8VgYg5nfw2AhOkqZbOXQTdg2DRVtDJfQapP2PVf4g';
        const Virgia_Hassan = 'https://i.ytimg.com/vi/g3A7Cp2yAro/maxresdefault.jpg';
        const Vita = 'https://live.staticflickr.com/65535/53458574431_71955797d8_z.jpg';
        const Melinda_Varera = 'https://i.scdn.co/image/ab67616d0000b2739e8575dbb9c92a4f3984a811';
        const UCAPAN_OPENING = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjzGVmq3IyMXLjvzFJiwn4e7QM0KO2kxS9a6k82wpwA5HOIBhuKYbfWm81jYOYvSqSZlRX3kPG_ZeVD-059rWmKdDdL1ITdvCv-iwtANHFyPinLecN_RCrBTGQK3mjCYjEGdj0gBNnDMM6QZ2DcnkVuTNEA_Vm2VEOu21HHyPrvFIb2qKnv4hqNDEufPfw/s1600/openingRSB.jpg';
        const IKLAN = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh3kvdmC7dAKO4NEBIHYqzIVCpCUjPipqTOwGJ-PZceBRYHQIhRI61imk6t2QXqJBBRsI4MYazWX1ecCGLery0jUwK9fkPpv7YQHKvE1W4OzRqHpal3VMsAvwl1pwYx28_-wP1KS9nq2EaR2E2qv3hw0k_mbfo9FagXNwhYNaOmZGRreSQwn2XsZ4FCyiw_/s1600/1200x1200iklan.jpg';
        
        if (a == 'HAZAFIT') {var z = HAZAFIT;}
            else if (a == 'Commercial Break') {var z = Commercial_Break;}
            else if (a == 'Raisa') {var z = Raisa;}
            else if (a == 'Della Monica') {var z = Della_Monica;}
            else if (a == 'Erina') {var z = Erina;}
            else if (a == 'Happy Asmara') {var z = Happy_Asmara;}
            else if (a == 'JINGLE') {var z = JINGLE;}
            else if (a == 'JINGLE SETELAH IKLAN') {var z = JINGLESETELAHIKLAN;}   
            else if (a == 'BENTRAP') {var z = BENTRAP;}
            else if (a == 'ADZAN DHUHUR') {var z = ADZAN_DHUHUR;}
            else if (a == 'ADZAN ASHAR') {var z = ASHAR;}
            else if (a == 'ADZAN MAGHRIB') {var z = ADZANMAGHRIB;}
            else if (a == 'Opening Radio') {var z = OpeningRadio;}
            else if (a == 'JINGLE PENUTUP') {var z = JINGLE_PENUTUP;}
            else if (a == 'BIO7') {var z = BIO7;}
            else if (a == 'AINUCARE') {var z = AINUCARE;}
            else if (a == 'H PRO') {var z = HAPRO;}
            else if (a == 'KH ZAINUDDIN MZ') {var z = KH_ZAINUDDIN_MZ;}
            else if (a == 'Suara Banyuwangi') {var z = Suara_Banyuwangi;}
            else if (a == 'Alffy Rev') {var z = AlffyRev;}
            else if (a == 'Ajeng') {var z = Ajeng;}
            else if (a == 'Agnes Monica') {var z = Agnes_Monica;}
            else if (a == 'Anji') {var z = Anji;}
            else if (a == 'LA PRO') {var z = LA_PRO;}
            else if (a == 'Ari Lasso') {var z = Ari_Lasso;}
            else if (a == 'MUHAMAD HANDOYO') {var z = Muhamad_Handoyo;}
            else if (a == 'HANDOYO') {var z = Handoyo;}    
            else if (a == 'Andmesh') {var z = Andmesh;}
            else if (a == 'Dewa 19 Ft Virzha') {var z = Dewa_19_Ft_Virzha;}
            else if (a == 'RENDRA PRASETYO') {var z = Rendra_Prasetyo;}
            else if (a == 'RENDRA') {var z = Rendra;}    
            else if (a == 'Egha De Latoya') {var z = EghaLatoya;}
            else if (a == 'Gamel Awan') {var z = GamelAwan;}
            else if (a == 'Cassandra') {var z = Cassandra;}
            else if (a == 'DHIKA RESTA') {var z = Dhika_Resta;}
            else if (a == 'Rozy Abdillah') {var z = Rozy;} 
            else if (a == 'Reny Farida') {var z = Reny;} 
            else if (a == 'O-NET') {var z = O_NET;} 
            else if (a == 'ON AIR') {var z = ON_AIR;} 
            else if (a == 'ILM') {var z = ILM;}     
            else if (a == 'Alvi Ananta') {var z = AlviAnanta;} 
            else if (a == 'Catur Arum') {var z = Catur_Arum;} 
            else if (a == 'Syahiba Saufa Ft. Shinta Arsinta') {var z = Syahiba_Saufa_Ft_Shinta_Arsinta;} 
            else if (a == 'Lusiana Safara') {var z = Lusiana;} 
            else if (a == 'Suliyana') {var z = Suliyana;} 
            else if (a == 'Syahiba Saufa') {var z = Syahiba;} 
            else if (a == 'TOP NEWS') {var z = TOP_NEWS;} 
            else if (a == 'Virgia Hassan') {var z = Virgia_Hassan;} 
            else if (a == 'Vita Alvia') {var z = Vita;} 
            else if (a == 'Melinda Varera') {var z = Melinda_Varera;} 
            else if (a == 'UCAPAN OPENING') {var z = UCAPAN_OPENING;} 
            else if (a == 'IKLAN') {var z = IKLAN;} 
        else {var z = ta;}
        for (c = 0; c < Za; c++) a = pb(a), b = qb(b);
        var c = I[C] + "https://itunes.apple.com/search?type=jsonp&term=" + encodeURI(a) + "-" + encodeURI(b) + "&media=music&limit=1";
        a = new XMLHttpRequest;
        a.onerror = function (a) {};
        a.onreadystatechange = function () {
          if (4 === this.readyState)
            if (200 === this.status) {
              var a = JSON.parse(this.responseText);
              a = a.resultCount ? a.results[0].artworkUrl100 : z;
              g[y] && (g[y].thumb = a, A())
            } else 403 === this.status && g[y] && (C++, C > I.length - 1 && (C = 0), A())
        };
        a.open("GET", c, !0);
        a.send();
        window.artworkDataXHR = a
      } else A()
    }

    function Ja(a) {
      N.empty();
      var b, c = a.length,
        f;
      for (b = 0; b < c; b++) {
        var e = a[b];
        var k = d('<div class="mrp-playlist-item"/>');
        if ((f = e.thumb || z) && !0 !== f) {
          var g = new Image;
          g.alt = e.title || "image";
          g.className = "mrp-playlist-thumb-img";
          g.onload = function () {
            this.className += " mrp-visible"
          };
          g.src = f;
          d('<span class="mrp-playlist-thumb"></span>').append(g).appendTo(k)
        }
        g = d('<span class="mrp-playlist-info"></span>').appendTo(k);
        f = e.title || Ha;
        e = e.artist || Ga;
        (f && e ? d('<span class="mrp-playlist-title">' + f + '</span><span class="mrp-playlist-separator">' + rb + '</span><span class="mrp-playlist-artist">' + e + "</span>") : f ? d('<span class="mrp-playlist-title">' + f + "</span>") : d('<span class="mrp-playlist-artist">' + e + "</span>")).appendTo(g);
        k.appendTo(N)
      }
      Ka = c;
      $a && !ab && (ab = !0, oa(va))
    }

    function sb() {
      E.empty();
      var a, b, c, f = 0;
      W.find(".mrp-playlist-item").each(function () {
        a = d(this).clone().attr("data-id", f).on("click", function () {
          var a = d(this);
          if (a.hasClass("mrp-playlist-item-active")) return !1;
          D && D.removeClass("mrp-playlist-item-active");
          D = a.addClass("mrp-playlist-item-active");
          H && setTimeout(function () {
            wa.click()
          }, 500);
          ca(a)
        });
        var e = a.attr("data-radio-thumb");
        if (e) {
          var h = new Image;
          h.alt = a.attr("data-title") || "image";
          h.className = "mrp-playlist-thumb-img";
          h.onload = function () {
            this.className += " mrp-visible"
          };
          h.src = e;
          d('<span class="mrp-playlist-thumb"></span>').append(h).appendTo(a)
        }
        c = d('<span class="mrp-playlist-info"></span>').appendTo(a);
        b = a.attr("data-radio-title") || "";
        d('<span class="mrp-playlist-title">'
          + b + "</span>").appendTo(c);
        a.appendTo(E);
        a.hasClass("mrp-playlist-item-active") && (D = a);
        f++
      });
      $a && !La && (La = !0, oa(xa))
    }

    function fa(a) {
      bb.html(a.title);
      cb.html(a.artist);
      
      if (!v)
        if (z) a.thumb = z;
        else return;
        var b = a.thumb;
      if (b && (Va = b = b == z && ta ? ta : b.replace("100x100bb", c.playerArtworkSize), ya.hasClass("mrp-thumb-hidden") ? ya.css("background-image", "url(" + b + ")").removeClass("mrp-thumb-hidden") : (db.css("background-image", "url(" + b + ")").removeClass("mrp-thumb-hidden"), ya.addClass("mrp-thumb-hidden")), "mediaSession" in
          navigator)) {
        b = a.thumb != z ? a.thumb.replace("100x100bb", "96x96bb") : z;
        var d = a.thumb != z ? a.thumb.replace("100x100bb", "128x128bb") : z,
          f = a.thumb != z ? a.thumb.replace("100x100bb", "192x192bb") : z,
          e = a.thumb != z ? a.thumb.replace("100x100bb", "256x256bb") : z,
          g = a.thumb != z ? a.thumb.replace("100x100bb", "640x640bb") : z;
        navigator.mediaSession.metadata = new MediaMetadata({
          title: a.title,
          artist: a.artist,
          artwork: [{
              src: b,
              sizes: "96x96",
              type: "image/png"
            }, {
              src: d,
              sizes: "128x128",
              type: "image/png"
            }, {
              src: f,
              sizes: "192x192",
              type: "image/png"
            },
            {
              src: e,
              sizes: "256x256",
              type: "image/png"
            }, {
              src: g,
              sizes: "384x384",
              type: "image/png"
            }, {
              src: g,
              sizes: "512x512",
              type: "image/png"
            }
          ]
        })
      }
    }

    function ob() {
      eb || (ha = d(document.createElement("audio")).attr("preload", tb), n = ha[0], eb = !0);
      R = l.radio;
      l.mountpoint && (R += l.mountpoint);
      "shoutcast" == x && "/;" != R.substring(R.length - 2) && (R += "/;");
      n.src = ub ? I + R : R;
      ha.on("ended", function () {}).on("canplay", function (a) {}).on("canplaythrough", function (a) {}).on("loadedmetadata", function () {
        l.playbackRate && (n.playbackRate = Number(l.playbackRate))
      }).on("play",
        function () {
          Ma || (Ma = !0, d(k).trigger("soundStart", {
            instance: k,
            instanceName: O,
            radioData: G
          }));
          if (vb && 1 < mrp_mediaArr.length) {
            var a, c = mrp_mediaArr.length;
            for (a = 0; a < c; a++) k != mrp_mediaArr[a].inst && mrp_mediaArr[a].inst.pauseMedia()
          }
          S.find(".mrp-play-icon").hide();
          S.find(".mrp-pause-icon").show();
          X = !0;
          d(k).trigger("soundPlay", {
            instance: k,
            instanceName: O,
            radioData: G
          })
        }).on("pause", function () {
        S.find(".mrp-play-icon").show();
        S.find(".mrp-pause-icon").hide();
        X = !1;
        d(k).trigger("soundPause", {
          instance: k,
          instanceName: O,
          radioData: G
        })
      }).on("error", function (a) {
        console.log(a);
        d(k).trigger("soundError", {
          instance: k,
          instanceName: O,
          error: a
        })
      });
      if (Na) {
        var a = n.play();
        void 0 !== a && a.then(function () {})["catch"](function (a) {})
      }
      n.volume = p;
      Na = !0;
      "shoutcast" == x ? Da() : "icecast" == x ? sa() : "radiojar" == x && Ea()
    }

    function fb() {
      m && clearInterval(m);
      m = null;
      n && (n.pause(), n.src = "");
      ha && ha.off("ended canplay canplaythrough loadedmetadata pause play error");
      bb.html("");
      cb.html("");
      db.css("background-image", "none").addClass("mrp-thumb-hidden");
      ya.css("background-image",
        "none").addClass("mrp-thumb-hidden");
      x = G = null;
      Ma = X = !1;
      S.find(".mrp-play-icon").show();
      S.find(".mrp-pause-icon").hide();
      r = null
    }

    function Ya() {
      window.radioXHR && (window.radioXHR.abort(), delete window.radioXHR);
      window.radioDataXHR && (window.radioDataXHR.abort(), delete window.radioDataXHR);
      window.artworkDataXHR && (window.artworkDataXHR.abort(), delete window.artworkDataXHR);
      x && fb();
      C = 0;
      N.empty();
      L = null;
      q = []
    }

    function pb(a) {
      a = a.toLowerCase();
      a = d.trim(a);
      a.includes("&") ? a = a.substr(0, a.indexOf(" &")) : a.includes("feat")
        ? a = a.substr(0, a.indexOf(" feat")) : a.includes("ft.") && (a = a.substr(0, a.indexOf(" ft.")));
      return a
    }

    function qb(a) {
      a = a.toLowerCase();
      a = d.trim(a);
      a.includes("&") ? a = a.replace("&", "and") : a.includes("(") ? a = a.substr(0, a.indexOf(" (")) : a.includes("ft") && (a = a.substr(0, a.indexOf(" ft")));
      return a
    }
    d(this).hasClass("mrp-fixed") && d(this).appendTo(d("body")).css("opacity", 1);
    var e = d(this),
      Oa = e.find(".mrp-player-holder"),
      wb = e.find(".mrp-playlist-holder"),
      E = e.find(".mrp-playlist-content"),
      Y = e.find(".mrp-playlist-filter-msg"),
      xa = e.find(".mrp-playlist-inner"),
      N = e.find(".mrp-history-content"),
      va = e.find(".mrp-history-inner"),
      xb = e.find(".mrp-popup-toggle"),
      db = e.find(".mrp-player-thumb1"),
      ya = e.find(".mrp-player-thumb2"),
      bb = e.find(".mrp-player-title"),
      cb = e.find(".mrp-player-artist"),
      S = e.find(".mrp-playback-toggle"),
      qa = e.find(".mrp-preloader"),
      wa = e.find(".mrp-history-title").on("click", function () {
        if (!t || d(this).hasClass("mrp-title-active")) return !1;
        N.children(".mrp-playlist-item").show();
        Y.hide();
        gb.val("");
        va.css({
          transform: "translateX(0px)"
        });
        xa.css({
          transform: "translateX(0)"
        });
        wa.addClass("mrp-title-active");
        hb.removeClass("mrp-title-active")
      }),
      hb = e.find(".mrp-station-title").on("click", function () {
        if (!t || d(this).hasClass("mrp-title-active")) return !1;
        E.children(".mrp-playlist-item").show();
        Y.hide();
        gb.val("");
        va.css({
          transform: "translateX(-100%)"
        });
        xa.css({
          transform: "translateX(-100%)"
        });
        wa.removeClass("mrp-title-active");
        hb.addClass("mrp-title-active")
      });
    c = d.extend(!0, {}, {
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
      createHistoryList: !1,
      playerArtworkSize: "640x640bb",
      instanceName: "player" + Math.floor(1E6 * Math.random()),
      defaultHistoryArtwork: "data/default_artwork/star_small.png",
      defaultPlayerArtwork: "data/default_artwork/star.png",
      defaultSongTitle: "...",
      defaultSongArtist: "...",
      whatsAppWarning: "Please share this content on mobile device!",
      playlistTitleArtistSeparator: "",
      hideVolumeOnIOS: !0,
      useCorsForAudio: !1,
      enableCors: !0
    }, c);
    var da = MRPUtils.isMobile();
    MRPUtils.hasLocalStorage();
    var W = d(c.playlistList),
      Xa = c.sourcePath,
      O = c.instanceName,
      Na = c.autoPlay,
      tb = c.preload,
      $a = c.useScroll,
      nb = c.scrollOrientation,
      yb = c.useKeyboardNavigationForPlayback,
      ib = c.facebookAppId,
      p = c.volume,
      I = c.cors.split(",").map(function (a) {
        return a.trim()
      }),
      vb = c.togglePlaybackOnMultipleInstances,
      v = c.getPlayerArtwork,
      ta = c.defaultPlayerArtwork,
      Ha = c.defaultSongTitle,
      Ga = c.defaultSongArtist,
      M = c.getHistoryArtwork,
      z = c.defaultHistoryArtwork,
      H = c.createHistoryList,
      ra = c.createHistoryListAsItPlays,
      ba = c.createRadioList,
      rb = c.playlistTitleArtistSeparator,
      ub = c.useCorsForAudio;
    H || (M = !1);
    var k = this;
    d("body");
    var Ua = d(window),
      Z = d(document),
      zb = MRPUtils.isIOS();
    MRPUtils.isAndroid();
    MRPUtils.isChrome();
    MRPUtils.isSafari();
    var Wa = "https:" == window.location.protocol ? "https:" : "http:",
      Ab = MRPUtils.volumeCanBeSet(),
      eb, ha, n, G, L, r, Va, ab, La, q = [],
      g = [],
      y, u, m, V = c.lastPlayedInterval,
      Ia = ["/status-json.xsl", "/status.xsl"],
      ua = 0,
      Ma, x, R, X, l, Ca, pa = !0,
      D = 0,
      Ka = 0,
      ma = [],
      C = 0;
    "undefined" === typeof window.mrp_mediaArr && (window.mrp_mediaArr = []);
    window.mrp_mediaArr.push({
      inst: k,
      id: O
    });
    da && (Na = !1);
    var gb = e.find(".mrp-search-filter").on("keyup.apfilter", function () {
      if (!t) return !1;
      if (wa.hasClass("mrp-title-active")) {
        if (!H) return !1;
        var a = d(this).val().toLowerCase(),
          b, c = 0;
        for (b = 0; b < Ka; b++) {
          var f = N.children(".mrp-playlist-item").eq(b);
          var e =
            f.find(".mrp-playlist-title");
          f = f.find(".mrp-playlist-artist");
          e = 0 == e.length ? "" : e.html().toLowerCase();
          f = 0 == f.length ? "" : f.html().toLowerCase(); - 1 < e.indexOf(a) || -1 < f.indexOf(a) ? N.children(".mrp-playlist-item").eq(b).show() : (N.children(".mrp-playlist-item").eq(b).hide(), c++)
        }
        c == Ka ? Y.show() : Y.hide()
      } else {
        if (!ba) return !1;
        a = d(this).val().toLowerCase();
        for (b = c = 0; b < U; b++) e = E.children(".mrp-playlist-item").eq(b).find(".mrp-playlist-title").html().toLowerCase(), -1 < e.indexOf(a) ? E.children(".mrp-playlist-item").eq(b).show()
          : (E.children(".mrp-playlist-item").eq(b).hide(), c++);
        c == U ? Y.show() : Y.hide()
      }
    });
    MRPUtils.isEmpty(ib) || "file:" == window.location.protocol ? console.log("facebookAppId has not been set in settings!") : Qa(ib);
    var w = e.find(".mrp-tooltip");
    da || ("static" == e.css("position") && console.log("wrapper css position is static, therefore tooltip might not work correctly. Please set wrapper css to other than static."), e.on("mouseenter", "[data-tooltip]", function (a) {
      var b = d(this);
      a = e[0].getBoundingClientRect();
      var c = b[0].getBoundingClientRect();
      w.text(b.attr("data-tooltip"));
      var f = parseInt(c.top - a.top - w.outerHeight());
      b = parseInt(c.left - a.left - w.outerWidth() / 2 + b.outerWidth() / 2);
      b + w.outerWidth() > e.width() ? b = e.width() - w.outerWidth() : 0 > b && (b = 0);
      0 > f + a.top && (f = parseInt(c.top - a.top + w.outerHeight() + 15));
      w.css({
        left: b + "px",
        top: f + "px"
      }).show()
    }).on("mouseleave", "[data-tooltip]", function (a) {
      w.hide()
    }));
    if ("ontouchstart" in window) {
      var Pa = "touchstart.ap mousedown.ap";
      var T = "touchmove.ap mousemove.ap";
      var ka = "touchend.ap mouseup.ap"
    } else window.PointerEvent
      ? (Pa = "pointerdown.ap", T = "pointermove.ap", ka = "pointerup.ap") : (Pa = "mousedown.ap", T = "mousemove.ap", ka = "mouseup.ap");
    var Ba = .5,
      ja, aa = e.find(".mrp-volume-toggle"),
      F = e.find(".mrp-volume-seekbar"),
      J = e.find(".mrp-volume-bg"),
      lb = e.find(".mrp-volume-level"),
      Q = void 0 != F.attr("data-is-vertical") ? !0 : !1,
      K = Q ? J.height() : J.width();
    0 > p ? p = 0 : 1 < p && (p = 1);
    0 != p && (Ba = p);
    if (Ab) F.on(Pa, function (a) {
      kb(a);
      return !1
    });
    else zb && c.hideVolumeOnIOS && (e.find(".mrp-volume-wrapper").remove(), e.find(".mrp-volume-toggle").remove());
    if (!da) {
      var za =
        function () {
          F.off(T, Ta).off("mouseout", za);
          Z.off("mouseout", za);
          w.hide()
        };
      F.on("mouseover", function () {
        F.on(T, Ta).on("mouseout", za);
        Z.on("mouseout", za)
      })
    }
    yb && Z.keyup(function (a) {
      if (!t) return !1;
      var b = a.keyCode;
      d(a.target);
      32 == b ? (k.togglePlayback(), a.preventDefault()) : 77 == b && P()
    });
    var jb = [e.find(".mrp-share-item"), xb, S, aa, e.find(".mrp-prev-toggle"), e.find(".mrp-next-toggle"), e.find(".mrp-playlist-toggle")],
      Za = jb.length,
      Aa;
    for (Aa = 0; Aa < Za; Aa++) d(jb[Aa]).css("cursor", "pointer").on("click", mb);
    this.playMedia =
      function () {
        if (!t || !x || X) return !1;
        if (n) {
          n.load();
          var a = n.play();
          void 0 !== a && a.then(function () {})["catch"](function (a) {})
        }
      };
    this.pauseMedia = function () {
      if (!t || !x || !X) return !1;
      n && n.pause()
    };
    this.togglePlayback = function () {
      if (!t || !x) return !1;
      if (n)
        if (n.paused) {
          n.load();
          var a = n.play();
          void 0 !== a && a.then(function () {})["catch"](function (a) {})
        } else n.pause()
    };
    this.destroyInstance = function () {
      window.radioXHR && (window.radioXHR.abort(), delete window.radioXHR);
      window.radioDataXHR && (window.radioDataXHR.abort(), delete window.radioDataXHR);
      window.artworkDataXHR && (window.artworkDataXHR.abort(), delete window.artworkDataXHR);
      F && F.off();
      fb();
      "undefined" !== typeof mCustomScrollbar && (va.mCustomScrollbar("destroy"), xa.mCustomScrollbar("destroy"));
      La = !1;
      E.empty();
      N.empty();
      w.hide()
    };
    this.destroyPlaylist = function () {
      if (!t) return !1;
      Ya()
    };
    this.loadPlaylist = function (a) {
      if (!t || pa) return !1;
      if ("undefined" === typeof a || MRPUtils.isEmpty(a)) return alert("loadPlaylist method requires id parameter. loadPlaylist failed."), !1;
      if (Ca == a) return !1;
      var b = W.find(d(a));
      if (0 == b.length) return alert("Failed playlist selection! Playlist - " + a + " does not exist. Check activePlaylist option in settings!"), !1;
      D && D.removeClass("mrp-playlist-item-active");
      ba && (D = E.find(d(a)).addClass("mrp-playlist-item-active"));
      ca(b)
    };
    this.openPopup = function () {
      if (!t) return !1;
      if ("function" === typeof mrpOpenPopup) mrpOpenPopup(k, c);
      else {
        var a = document.createElement("script");
        a.type = "text/javascript";
        a.src = MRPUtils.qualifyURL(Xa + "js/popup.js");
        a.onload = a.onreadystatechange = function () {
          this.readyState
            && "complete" != this.readyState || mrpOpenPopup(k, c)
        };
        a.onerror = function () {
          alert("Error loading " + this.src)
        };
        var b = document.getElementsByTagName("script")[0];
        b.parentNode.insertBefore(a, b)
      }
    };
    this.getRadioData = function () {
      return t ? G : !1
    };
    this.getPlaylistLoading = function () {
      return pa
    };
    this.setPlaybackRate = function (a) {
      if (!t || !x) return !1;
      n && (n.playbackRate = Number(a))
    };
    this.setVolume = function (a) {
      if (!t) return !1;
      0 > a ? a = 0 : 1 < a && (a = 1);
      la(a)
    };
    this.getVolume = function () {
      return p
    };
    this.toggleMute = function () {
      if (!t) return !1;
      P()
    };
    this.getSetupDone = function () {
      return t
    };
    this.getMediaPlaying = function () {
      return t ? X : !1
    };
    this.getWrapper = function () {
      return e
    };
    this.getPlaylistList = function () {
      return W
    };
    this.getSettings = function () {
      return c
    };
    "fixed" == O ? this.togglePlaylist = function () {
      k.playlistOpened ? e.animate({
        bottom: -wb.height() + "px"
      }, 350) : e.animate({
        bottom: 0
      }, 350);
      k.playlistOpened = !k.playlistOpened
    } : "artwork5" == O && (this.togglePlaylist = function () {
      var a = e.width() - 50;
      k.playlistOpened ? Oa.css("left", Oa.css("left")).stop().animate({
        left: "0px"
      }, {
        duration: 500
      }) : Oa.stop().animate({
        left: a + "px"
      }, {
        duration: 500
      });
      k.playlistOpened = !k.playlistOpened
    });
    var t = !0;
    d(k).trigger("setupDone", {
      instance: k,
      instanceName: O
    });
    W.find(".mrp-playlist-item").each(function () {
      ma.push(d(this).removeClass("mrp-playlist-item-active"))
    });
    var U = ma.length;
    if (void 0 != c.activeRadioStationIndex) var ia = W.find(".mrp-playlist-item").eq(c.activeRadioStationIndex);
    else if (c.activePlaylist && (ia = W.find(d(c.activePlaylist)), 0 == ia.length)) {
      alert("Failed playlist selection! Playlist - "
        + c.activePlaylist + " does not exist. Check activePlaylist option in settings!");
      return
    }
    ia && (ia.addClass("mrp-playlist-item-active"), ca(ia));
    ba && sb();
    return this
  }
})(jQuery);
(function (d) {
  var c = function () {};
  c.isEmpty = function (c) {
    return 0 == c.replace(/^\s+|\s+$/g, "").length
  };
  c.isNumber = function (c) {
    return !isNaN(parseFloat(c)) && isFinite(c)
  };
  c.isMobile = function () {
    return /Android|webOS|iPhone|iPad|iPod|sony|BlackBerry/i.test(navigator.userAgent)
  };
  c.isIE = function () {
    var c = -1;
    if ("Microsoft Internet Explorer" == navigator.appName) {
      var d = navigator.userAgent,
        P = /MSIE ([0-9]{1,}[.0-9]{0,})/;
      null != P.exec(d) && (c = parseFloat(RegExp.$1))
    } else "Netscape" == navigator.appName && (d = navigator.userAgent,
      P = /Trident\/.*rv:([0-9]{1,}[.0-9]{0,})/, null != P.exec(d) && (c = parseFloat(RegExp.$1)));
    return -1 != c ? !0 : !1
  };
  c.isIOS = function () {
    return navigator.userAgent.match(/(iPad|iPhone|iPod)/g)
  };
  c.isAndroid = function () {
    return -1 < navigator.userAgent.indexOf("Android")
  };
  c.qualifyURL = function (c) {
    var d = document.createElement("a");
    d.href = c;
    return d.href
  };
  c.relativePath = function (c) {
    return /^(?:[a-z]+:)?\/\//i.test(c)
  };
  c.hasLocalStorage = function () {
    try {
      return "localStorage" in d && null !== d.localStorage
    } catch (Qa) {
      return !1
    }
  };
  c.isChrome =
    function () {
      return !!d.chrome && (!!d.chrome.webstore || !!d.chrome.runtime)
    };
  c.isSafari = function () {
    return 0 < Object.prototype.toString.call(d.HTMLElement).indexOf("Constructor")
  };
  c.volumeCanBeSet = function () {
    var c = document.createElement("audio");
    if (!c) return !1;
    c.addEventListener("volumechange", function () {}, !1);
    c.volume = 0;
    return 0 == c.volume ? !0 : !1
  };
  d.MRPUtils = c
})(window);
