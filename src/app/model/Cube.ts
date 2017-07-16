import { Cubelet, Axes } from './Cubelet';
import { Face } from './Face';
import { FaceColor } from './FaceColor';
import { CubeSlice } from './CubeFace';
import { CubeState } from './CubeState';
import { Graphics } from './Graphics';

import * as THREE from 'three';

export class Cube {
    public faces: Array<Face>;

    public root: THREE.Group;

    public state: CubeState = CubeState.NOT_MOVING;

    public cubelets: Array<Cubelet>;

    private ROTATION_SPEED = 0.5; //in seconds

    private totalRotation = 0;

    constructor(meshes: THREE.Mesh[]) {
        this.root = new THREE.Group();

        this.faces = new Array<Face>();

        this.cubelets = this.createAllCubelets(meshes);
        for (var c of this.cubelets) {
            this.root.add(c.mesh);
        }
    }

    rotateFaceUpdate(state: CubeState, delta: number) {
        var t = (Math.PI / 2) * (delta / (this.ROTATION_SPEED * 1000));
        this.totalRotation += t;

        var faceIsNormal = state.face.normal ? 1 : -1;
        var factorInverted = state.inverted ? 1 : -1;
        var factor = faceIsNormal * factorInverted;
        t = factor * t;
        var rightAngle = factor * Math.PI / 2;

        var cubs: Array<Cubelet> = this.getFace(state.face);

        if (this.totalRotation >= Math.PI / 2) {
            this.totalRotation = 0;
            this.state = CubeState.NOT_MOVING;

            for (var c of cubs) {
                if (state.face.axis == Axes.Y) {
                    c.mesh.rotation.y = rightAngle;
                } else if (state.face.axis == Axes.X) {
                    c.mesh.rotation.x = rightAngle
                } else if (state.face.axis == Axes.Z) {
                    c.mesh.rotation.z = rightAngle;
                }
                // Graphics.normalize(c.mesh);
            }
            this.logicRotateFace(state.face, state.inverted);
        } else {
            for (var c of cubs) {
                if (state.face.axis == Axes.Y) {
                    c.mesh.rotateY(t);
                } else if (state.face.axis == Axes.X) {
                    c.mesh.rotateX(t);
                } else if (state.face.axis == Axes.Z) {
                    c.mesh.rotateZ(t);
                }
            }
        }
    }

    rotateFace(state: CubeState) {
        var faceIsNormal = state.face.normal ? 1 : -1;
        var factorInverted = state.inverted ? 1 : -1;
        var factor = faceIsNormal * factorInverted;
        var t = factor * Math.PI / 2;

        var cubs: Array<Cubelet> = this.getFace(state.face);

        for (var c of cubs) {
            if (state.face.axis == Axes.Y) {
                c.mesh.rotation.y = t;
            } else if (state.face.axis == Axes.X) {
                c.mesh.rotation.x = t
            } else if (state.face.axis == Axes.Z) {
                c.mesh.rotation.z = t;
            }
            // Graphics.normalize(c.mesh);
        }
        this.logicRotateFace(state.face, state.inverted);

    }

    logicRotateFace(face: CubeSlice, inverted: boolean) {
        var ccw: boolean;

        if (face.normal) {
            if (!inverted) {
                ccw = false;
            } else {
                ccw = true;
            }
        } else {
            if (!inverted) {
                ccw = true;
            } else {
                ccw = false;
            }
        }

        var cubs: Array<Cubelet> = this.getFace(face);

        for (var c of cubs) {
            c.rotate(face.axis, ccw);
        }
    }

    private createAllCubelets(meshes: THREE.Mesh[]): Array<Cubelet> {

        var cubelets = new Array<Cubelet>();

        var coords = [-1, 0, 1];

        for (var i of coords) {
            for (var j of coords) {
                for (var k of coords) {
                    if (i != 0 || j != 0 || k != 0) {
                        var name = 'cubelet_' + i + '_' + j + '_' + k;
                        cubelets.push(new Cubelet(i, j, k, meshes));
                    }
                }
            }
        }

        return cubelets;
    }

    public getFace(face: CubeSlice): Array<Cubelet> {
        var result: Array<Cubelet> = new Array<Cubelet>();

        if (face == CubeSlice.MIDDLE) {
            for (var c of this.cubelets) {
                if (c[CubeSlice.RIGHT.name] == FaceColor.BLACK && c[CubeSlice.LEFT.name] == FaceColor.BLACK) {
                    result.push(c);
                }
            }
        } else if (face == CubeSlice.EQUATORIAL) {
            for (var c of this.cubelets) {
                if (c[CubeSlice.UP.name] == FaceColor.BLACK && c[CubeSlice.DOWN.name] == FaceColor.BLACK) {
                    result.push(c);
                }
            }
        } else if (face == CubeSlice.STANDING) {
            for (var c of this.cubelets) {
                if (c[CubeSlice.FRONT.name] == FaceColor.BLACK && c[CubeSlice.BACK.name] == FaceColor.BLACK) {
                    result.push(c);
                }
            }
        } else {
            for (var c of this.cubelets) {
                if (c[face.name] != FaceColor.BLACK) {
                    result.push(c);
                }
            }
        }

        return result;
    }

}