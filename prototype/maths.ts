namespace United {
	export module Math {
		export class Polar {
			public rayon: number;
			public theta: number;

			/**
			* theta : radians
			*/
			constructor(rayon: number, theta: number) {
				this.rayon = rayon;
				this.theta = theta;
			}

			toCarthesian(): Vector2 {
				return new Vector2(this.rayon * Math.cos(this.theta), this.rayon * Math.sin(this.theta));
			}
		}

		export class Vector2 extends Sup.Math.Vector2 {
			// Donne le putain de vecteur direction de sa mère du
			// Point/Vecteur from au Point/Vecteur to
			// (oui il y a fromto.subtract(tofrom) mais je sais jamais dans quel sens ça ce met)
			static getVector(from: Sup.Math.Vector2, to: Sup.Math.Vector2): Sup.Math.Vector2 {
				return to.subtract(from);
			}

			toPolar(): Polar {
				return new Polar(this.length(), this.angle());
			}

			set _angle(angle) {
				let v: any = this.toPolar();
				v.theta = angle;
				v = v.toCarthesian();

				this.x = v.x;
				this.y = v.y;
			}

			get _angle() {
				return this.angle();
			}

			set _length(length) {
				let v: any = this.toPolar();
				v.rayon = length;
				v = v.toCarthesian();

				this.x = v.x;
				this.y = v.y;
			}

			get _length() {
				return this.length();
			}
		}

		export class Vector3 extends Sup.Math.Vector3 {
			// Donne le putain de vecteur direction de sa mère du
			// Point/Vecteur from au Point/Vecteur to
			// (oui il y a fromto.subtract(tofrom) mais je sais jamais dans quel sens ça ce met)
			static getVector(from: Sup.Math.Vector3, to: Sup.Math.Vector3): Sup.Math.Vector3 {
				return to.subtract(from);
			}
		}

		interface ICoordinateConstructor {
			vector?: Sup.Math.Vector2 | Vector2 | Sup.Math.XY;
			polar?: Polar;
		}

		class Coordinate2D {
			private _polar: Polar;
			private _vector: Vector2;

			constructor(arg?: ICoordinateConstructor) {
				if (arg.vector) {
					this._vector = new Vector2(arg.vector.x, arg.vector.y);
					this._polar = this._vector.toPolar();
				}
				else if (arg.polar) {
					this._polar = new Polar(arg.polar.rayon, arg.polar.theta);
					this._vector = this._polar.toCarthesian();
				}
				else {
					this._polar = new Polar(0, 0);
					this._vector = new Vector2(0, 0);
				}
			}

			/* radians */
			get angle() : number { return this._polar.theta; }
			get rayon () : number { return this._polar.rayon; }
			get polar() : Polar { return new Polar(this.rayon, this.angle); }

			get x() : number { return this._vector.x; }
			get y() : number { return this._vector.y; }
			get vector() : Vector2 | Sup.Math.Vector2 | Sup.Math.XY { return new Vector2(this.x, this.y); }

			/* radians */
			set angle(value : number) {
				this._polar.theta = value;
				this._vector = this._polar.toCarthesian();
			}
			set rayon(value : number) {
				this._polar.rayon = value;
				this._vector = this._polar.toCarthesian();
			}
			set polar(value : Polar) {
				this._polar = new Polar(value.rayon, value.theta);
				this._vector = this._polar.toCarthesian();
			}

			set x(value: number) {
				this._vector.x = value;
				this._polar = this._vector.toPolar();
			}
			set y(value : number) {
				this._vector.y = value;
				this._polar = this._vector.toPolar();
			}
			set vector(value : Vector2 | Sup.Math.Vector2 | Sup.Math.XY) {
				this._vector = new Vector2(value.x, value.y);
				this._polar = this._vector.toPolar();
			}

		}
	}
}